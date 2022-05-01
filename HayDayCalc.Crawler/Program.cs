using AngleSharp.Dom;
using AngleSharp.Html.Dom;
using AngleSharp.Html.Parser;
using HayDayCalc.Crawler;
using System.Text.Json;
using System.Text.RegularExpressions;

const string WikiBaseUrl = "https://hayday.fandom.com";
const bool GetBase64 = false;
var regex = new Regex("(\\d+)");

HttpClient client = new HttpClient();
var goodsWikiStr = await client.GetStringAsync($"{WikiBaseUrl}/wiki/Goods_List");
Console.WriteLine("Goods data retrived!");
var buildingsWikiStr = await client.GetStringAsync($"{WikiBaseUrl}/wiki/Production_Buildings");
var animalsWikiStr = await client.GetStringAsync($"{WikiBaseUrl}/wiki/Animals");
var treeBushWikiStr = await client.GetStringAsync($"{WikiBaseUrl}/wiki/Trees_and_Bushes");
Console.WriteLine("buidlings data retrived!");

var parser = new HtmlParser();
var goodsDom = await parser.ParseDocumentAsync(goodsWikiStr);
var buildingsDom = await parser.ParseDocumentAsync(buildingsWikiStr);
var animalsDom = await parser.ParseDocumentAsync(animalsWikiStr);
var treeBushDom = await parser.ParseDocumentAsync(treeBushWikiStr);
var goodsEntries = goodsDom.QuerySelectorAll("table.wikitable tbody tr").Skip(1); // Disparity with chrome
var treeBushEntries = treeBushDom.QuerySelectorAll(".mw-parser-output > table[cellpadding] tbody tr");
var sourceEntries = new IHtmlDocument[] { buildingsDom, animalsDom }
    .SelectMany(x => x.QuerySelectorAll("#gallery-0 > div"));

var productDict = new Dictionary<string, Product>();
var sourceDict = new Dictionary<string, Source>();

// Defaults
sourceDict["Field"] = new()
{
    Name = "Field",
    Level = 1,
    WikiUrl = $"{WikiBaseUrl}/wiki/Farm",
    ImageUrl = "https://static.wikia.nocookie.net/hayday/images/f/f1/Field.png/",
};

sourceDict["Beehive tree"] = new()
{
    Name = "Beehive tree",
    Level = 39,
    WikiUrl = $"{WikiBaseUrl}/wiki/Beehive_Tree",
    ImageUrl = "https://static.wikia.nocookie.net/hayday/images/d/de/Beehive_Tree_Stage_4.png/",
};

sourceDict["Squirrel House"] = new()
{
    Name = "Squirrel House",
    Level = 62,
    WikiUrl = $"{WikiBaseUrl}/wiki/Squirrel_House",
    ImageUrl = "https://static.wikia.nocookie.net/hayday/images/2/27/Squirrel_House_Stage_4.png/",
};

sourceDict["Fish"] = new()
{
    Name = "Fish",
    Level = 27,
    WikiUrl = $"{WikiBaseUrl}/wiki/Fish",
    ImageUrl = "https://static.wikia.nocookie.net/hayday/images/f/f8/Sockeye_Salmon.png/"
};


productDict["Fish fillet"] = new()
{
    Name = "Fish fillet",
    Level = 27,
    WikiUrl = $"{WikiBaseUrl}/wiki/Fish_Fillet",
    ImageUrl = "https://static.wikia.nocookie.net/hayday/images/6/63/Fish_Fillet.png/",
    MaxPrice = 54,
    Recipes =
        new string[] { "Red lure", "Green lure", "Blue lure", "Purple lure", "Gold lure" }.Select(x =>
        {
            return new Recipe()
            {
                Name = x,
                Tags = new List<string>() { "lure" },
                Source = sourceDict["Fish"],
                XP = 4,
                Ingridients = new List<Ingridient>() { new Ingridient(x, 1) }
            };
        }).Append(new Recipe()
        {
            Name = "Fishing net",
            Tags = new List<string>() { "default", "fishing net" },
            Source = sourceDict["Fish"],
            XP = 20,
            Ingridients = new List<Ingridient>() { new Ingridient("Fishing net", 1) }
        }).ToList(),
};

Console.WriteLine();
Console.WriteLine("Begin reading sources: ");
foreach (var item in sourceEntries)
{
    Source s = new();
    try
    {
        s.WikiUrl = WikiBaseUrl + item.QuerySelector("div.thumb a").GetAttribute("href");
        s.ImageUrl = ProcessImg(item.QuerySelector("div.thumb img").GetAttribute("src"));
        s.Name = item.QuerySelector("div.thumb img").GetAttribute("alt").Trim();
        var levelText = item.QuerySelector("div.lightbox-caption")
            .ChildNodes
            .OfType<IText>()
            .LastOrDefault()?
            .Text.Trim();

        if (!TryGetFirstInt(levelText, out var level))
            Console.Error.WriteLine($"Cannot find level requirement for building: {s.Name}!");

        s.Level = level;

        if (GetBase64)
        {
            s.ImageBase64 = Convert.ToBase64String(await client.GetByteArrayAsync(s.ImageUrl));
        }
        Console.WriteLine($"Building read: Lv. {s.Level} {s.Name}!");

        sourceDict[s.Name] = s;
    }
    catch (Exception e)
    {
        Console.Error.WriteLine($"Error while reading building: {s.Name}");
        Console.Error.WriteLine(e);
    }
}

for (int i = 0; i < treeBushEntries.Length; i += 6)
{
    for (int j = 0; j < 4; j++)
    {
        var tb = new Source();
        tb.ImageUrl = treeBushEntries[i].Children[j].QuerySelector("img").GetAttribute("src");
        if(GetBase64)
        {
            tb.ImageBase64 = Convert.ToBase64String(await client.GetByteArrayAsync(tb.ImageUrl));
        }

        tb.Name = treeBushEntries[i + 1].Children[j].QuerySelector("a").TextContent;
        tb.WikiUrl = WikiBaseUrl + treeBushEntries[i + 1].Children[j].QuerySelector("a").GetAttribute("href");
        if(!TryGetFirstInt(treeBushEntries[i + 2].Children[j].TextContent, out int level))
            Console.Error.WriteLine($"Cannot find level requirement for building: {tb.Name}!");
        tb.Level = level;

        Console.WriteLine($"Bush and tree read: Lv. {tb.Level} {tb.Name}!");
        sourceDict[tb.Name] = tb;
    }
}

Console.WriteLine();
Console.WriteLine("Begin reading good lists: ");
foreach(var item in goodsEntries)
{
    Product p = new Product();
    try
    {
        var col = item.Children.Where(x => x is not IText).ToArray();
        var nameEle = col[0].QuerySelector("b a");
        var name = nameEle.InnerHtml.Trim();

        if(name == "Fish fillet") continue;

        if(productDict.TryGetValue(name, out var ep))
            p = ep;
        else
            productDict[name] = p;


        p.Name = name;
        p.WikiUrl = WikiBaseUrl + nameEle.GetAttribute("href");

        var imgEle = col[0].QuerySelector("img");
        p.ImageUrl = ProcessImg(imgEle.GetAttribute("data-src") ?? imgEle.GetAttribute("src"));


        if(!TryGetFirstInt(col[1].InnerHtml, out var level))
            Console.Error.WriteLine($"Cannot find level requirement for product: {p.Name}!");
        p.Level = level;

        if (!int.TryParse(col[2].InnerHtml.Trim(), out var mp))
            Console.Error.WriteLine($"Cannot find max price for product: {p.Name}!");
        p.MaxPrice = mp;

        if (!int.TryParse(col[4].InnerHtml.Trim(), out var xp))
            Console.Error.WriteLine($"Cannot find xp reward for product: {p.Name}!");

        // almost all recipe are: Instant or 1 time (3 star time)
        var ingridients = ReadIngridients(p, col[5]);
        var srcName = col[6].QuerySelector("a").InnerHtml.Trim();
        var time = ParseTime(p, col[3]);
        if (!sourceDict.TryGetValue(srcName, out var source))
            Console.Error.WriteLine($"Cannot find source named {srcName} for product: {p.Name}!");


        p.Recipes.Add(new Recipe()
        {
            Name = "Default",
            Ingridients = ingridients,
            Time = time[""],
            Source = source,
            XP = xp,
            Tags = new List<string>() { "default" },
            ResultCount = name.EndsWith("feed") ? 3 : 1
        });
        

        if(time.ContainsKey("★★★"))
        {
            p.Recipes.Add(new Recipe()
            {
                Name = "3 star upgrade",
                Ingridients = ingridients,
                Time = time["★★★"],
                Source = source,
                XP = xp,
                Tags = new List<string>() { "3*" }
            });
        }


        p.PerBoatCrate = col[7].InnerHtml.Trim();

        //Console.WriteLine($"Product read: {p.Name}!");
    }
    catch (Exception e)
    {
        Console.Error.WriteLine($"Error while reading building: {p.Name}");
        Console.Error.WriteLine(e);
    }
}


var json = JsonSerializer.Serialize(productDict, new JsonSerializerOptions() { PropertyNamingPolicy = JsonNamingPolicy.CamelCase });
await File.WriteAllTextAsync("output.json", json);

Dictionary<string, int> ParseTime(Product p, IElement element)
{
    var dict = new Dictionary<string, int>();
    if (element.TextContent.Trim() == "Instant")
    {
        dict.Add(string.Empty, 0);
        return dict;
    }
    
    var regex = new Regex(@"\d+ (h|min|d)");
    var timeEntries = element.ChildNodes.OfType<IText>().Select(x => x.Text);
    foreach(var entry in timeEntries)
    {
        var acc = 0;
        foreach (Match timePart in regex.Matches(entry))
        {
            if(TryGetFirstInt(timePart.Value, out var tp))
            {
                if (timePart.Value.Contains('h'))
                    acc += tp * 3600;
                else if (timePart.Value.Contains("min"))
                    acc += tp * 60;
                else if (timePart.Value.Contains('d'))
                    acc += tp * 3600 * 24;
            }
        }

        dict[regex.Replace(entry, string.Empty).Trim()] = acc;
    }

    return dict;
}


List<Ingridient> ReadIngridients(Product p, IElement root)
{
    var res = new List<Ingridient>();
    string[] filter = { "N/A", "None", "Supplies" };
    if (!filter.Contains(root.TextContent.Trim()))
    {
        var firstInEle = root.ChildNodes.QuerySelector("a");
        if (!TryGetFirstInt((firstInEle?.NextSibling is IText ft) ? ft.Text : string.Empty, out var famount))
            Console.Error.WriteLine($"Cannot find ingridient amount for product: {p.Name}!");

        var figName = firstInEle?.GetAttribute("title") ?? "Unknown";
        res.Add(new(NormalizeName(figName), famount));

        var aIn = root.QuerySelector("p") != null ?
            root.QuerySelector("p").ChildNodes.GetEnumerator() :
            root.ChildNodes.Skip(3).GetEnumerator();
        while (aIn.MoveNext())
        {
            while (aIn.Current is not IElement && aIn.MoveNext()) ;

            if (aIn.Current is not IElement ie)
            {
                Console.Error.WriteLine($"Something went wrong while reading ingridients for product: {p.Name}!");
                break;
            }

            var name = ie.GetAttribute("title").Trim();
            if (!aIn.MoveNext())
            {
                Console.Error.WriteLine($"Something went wrong while reading ingridients for product: {p.Name}!");
                break;
            }

            if (!TryGetFirstInt(aIn.Current.TextContent, out var amount))
            {
                Console.Error.WriteLine($"Cannot read the amount of ingridients {name} for product: {p.Name}!");
                continue;
            }

            res.Add(new(NormalizeName(name), amount));
            aIn.MoveNext(); // Skipping <br> tag
        }
    }

    return res;
}


bool TryGetFirstInt(string? text, out int level)
{
    level = default;
    if (string.IsNullOrEmpty(text)) return false;

    var match = regex!.Match(text);
    if (match.Groups.Count > 0 && int.TryParse(match.Groups[0].Value, out level))
        return true;
    else 
        return false;
}

string NormalizeName(string figName)
{
    var res = productDict.Keys.FirstOrDefault(x => string.Compare(x, figName, true) == 0);
    return res ?? figName[0] + figName.Substring(1).ToLower();
}

string ProcessImg(string url)
{
    Regex regex = new Regex("(.*)revision");
    var match = regex.Match(url);
    if(match.Success)
    {
        return match.Groups[1].Value;
    }

    return url;
}