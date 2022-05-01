namespace HayDayCalc.Crawler;

public class Product : WikiItem
{
    public int MaxPrice { get; set; }

    public int DefaultPrice => (int)Math.Round(MaxPrice / 3.6);

    public List<Recipe> Recipes { get; set; } = new List<Recipe>();

    public string? PerBoatCrate { get; set; }
}

public class Recipe
{
    public string Name { get; set; } = string.Empty;
    public List<string> Tags { get; set; } = new List<string>();
    public List<Ingridient> Ingridients { get; set; } = new List<Ingridient>();
    public Source? Source { get; set; }
    public int Time { get; set; }
    public int XP { get; set; }
    public int ResultCount { get; set; } = 1;
}

public class Ingridient
{
    public Ingridient()
    {

    }

    public Ingridient(string product, int count)
    {
        Product = product;
        Count = count;
    }

    public string Product { get; set; } = string.Empty;
    public int Count { get; set; }
}