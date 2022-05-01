// const Node = ({ data, node, bounds, recipeSelector }) => {
//   const { x, y } = bounds;
//   const { imageUrl, name } = node;
//   const {
//     name: rcName,
//     tags,
//     ingridients,
//     source,
//     time,
//     resultCount,
//   } = recipeSelector(node.recipes);

//   const startX = x - 148 / 2;
//   const startY = y - 106 / 2;
//   // Width 148px = 8 * 2 padding + 24 icon + 100 text + 8 spacing
//   // Height 106px = 8 * 2 padding + 24 icon + 8 spacing + 12 name + 2 * 2 spacing (tags) + 6 tags + (2 + 8) * 4 ingridients
//   return (
//     <g>
//       <svg x={startX} y={startY} width="148" height="106">
//         <rect width="100%" height="100%" stroke="green" fill="transparent" />
//         {/* Product icon */}
//         <image
//           x={8}
//           y={8}
//           href={imageUrl.slice(0, imageUrl.indexOf("revision"))}
//           width="24"
//           height="24"
//         />

//         <ProductionTime time={time} x={8 + 24 + 4} y={8} />

//         <text x={32 + 4} y={8 + 24} fontSize={14}>
//           {name}
//         </text>

//         <IngridientTitle name={rcName} tags={tags} x={8} y={32 + 4} />

//         {ingridients.map(({ product, count }, i) => (
//           <IngridientItem
//             key={i}
//             x={8}
//             y={46 + 12 + i * 7}
//             product={data[product]}
//             count={count}
//           />
//         ))}
//       </svg>
//       {/* Source icon */}
//       <image
//         x={startX + 112}
//         y={startY - 16}
//         href={source.imageUrl.slice(0, imageUrl.indexOf("revision"))}
//         width="32"
//         height="32"
//       />
//     </g>
//   );
// };

// const ProductionTime = ({ time, ...rest }) => {
//   return (
//     <svg {...rest}>
//       <RiTimerFlashLine fontSize={8} />
//       <text x={8} y={7} fontSize={8}>
//         {" "}
//         {formatTimeFromSeconds(time)}{" "}
//       </text>
//     </svg>
//   );
// };

// const IngridientTitle = ({ name, tags, x, y, ...rest }) => {
//   return (
//     <svg x={x} y={y} {...rest}>
//       <text y={10} fontSize={10}>
//         Recipe: {name}
//       </text>
//       <BsTagFill x={1} y={12} fontSize={6} />
//       {tags.map((tag, i) => (
//         <text key={i} x={8} y={18} fontSize={6}>
//           {tag}
//         </text>
//       ))}
//     </svg>
//   );
// };

// const IngridientItem = ({ x, y, product, count }) => {
//   console.log("t", product);
//   const { name, imageUrl } = product;

//   return (
//     <g>
//       <text x={x} y={y + 6} fontSize={6}>
//         {count}x
//       </text>
//       <image
//         x={x + 10}
//         y={y}
//         width={6}
//         height={6}
//         href={imageUrl.slice(0, imageUrl.indexOf("revision"))}
//       />
//       <text x={x + 18} y={y + 6} fontSize={6}>
//         {name}
//       </text>
//     </g>
//   );
// };
