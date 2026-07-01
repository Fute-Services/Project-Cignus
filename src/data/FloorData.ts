// // import image1 from '../assets/../assets/Project_Details/animated.png';
// // import image2 from '../assets/Project_info/ProjectInfoimage.png';

// import floorGround from '../assets/UnitPlan/2-d-floorplans/Ground_Floor.png';

// import floor1 from '../assets/UnitPlan/2-d-floorplans/1st_Floor.png';

// import floor2 from '../assets/UnitPlan/2-d-floorplans/2nd_Floor.png';

// import floor3 from '../assets/UnitPlan/2-d-floorplans/3rd_Floor.png';

// import floor4 from '../assets/UnitPlan/2-d-floorplans/4th_Floor.png';

// import floor5 from '../assets/UnitPlan/2-d-floorplans/5th_Floor.png';
// import floor6 from '../assets/UnitPlan/floorplans/6th_floor-removebg-preview 1.png';

// import floor7 from '../assets/UnitPlan/2-d-floorplans/7th_Floor_Refuge.png';

// import floor8 from '../assets/UnitPlan/2-d-floorplans/8_13&13_15_Typical.png';

// import floor9 from '../assets/UnitPlan/2-d-floorplans/8_13&13_15_Typical.png';

// import floor10 from '../assets/UnitPlan/2-d-floorplans/8_13&13_15_Typical.png';

// import floor11 from '../assets/UnitPlan/2-d-floorplans/8_13&13_15_Typical.png';

// import floor12 from '../assets/UnitPlan/2-d-floorplans/8_13&13_15_Typical.png';

// import floor13 from '../assets/UnitPlan/2-d-floorplans/8_13&13_15_Typical.png';
// import floor14 from '../assets/UnitPlan/floorplans/14th_floor_refuge-removebg-preview 1.png';

// import floor15 from '../assets/UnitPlan/2-d-floorplans/8_13&13_15_Typical.png';
// import floor16 from '../assets/UnitPlan/floorplans/16th_floor-removebg-preview 1.png';
// import floor17 from '../assets/UnitPlan/floorplans/17th_floor-removebg-preview 1.png';
// import floor18 from '../assets/UnitPlan/floorplans/18th_floor-removebg-preview 1.png';
// import floor19 from '../assets/UnitPlan/floorplans/19th_floor-removebg-preview 1.png';
// // import floor20 from '../../assets/UnitPlan/floorplans/20th_floor-removebg-preview 1.png';

// import floor21 from '../assets/UnitPlan/2-d-floorplans/21_Refuge.png';

// import floor22 from '../assets/UnitPlan/2-d-floorplans/22_25_Typical.png';

// import floor23 from '../assets/UnitPlan/2-d-floorplans/22_25_Typical.png';

// import floor24 from '../assets/UnitPlan/2-d-floorplans/22_25_Typical.png';

// import floor25 from '../assets/UnitPlan/2-d-floorplans/22_25_Typical.png';

// export interface SideContentPolygon {
//     id: string;
//     polygon: string;
// }

// export interface SideContentItem {
//     id: number;
//     title: string;
//     polygons: SideContentPolygon[];
// }

// export interface FloorData {
//     id: number;
//     name: string;
//     area: string;
//     points: string;
//     gradientId: string;
//     /** Anchor point (in SVG-viewBox units) for the tooltip arrow tip */
//     anchorX: number;
//     anchorY: number;
//     floorname: string;
//     area1: string;
//     area2: string;
//     unitplan: {
//         image_2d: string;
//         image_3d: string;
//         sideContent: SideContentItem[];
//     };
// }
// export const VIEWBOX_W = 1982;
// export const VIEWBOX_H = 1024;

// export const floors: FloorData[] = [
//     {
//         id: 25,
//         name: "25",
//         area: "12,000 sqft",
//         points: "725,717,725,732,1089,729,1206,727,1248,731,1248,713,1092,710,938,715,795,715",
//         gradientId: "grad10",
//         anchorX: 1246,
//         anchorY: 723,
//         floorname: "Podium 1",
//         area1: "12000 sqft",
//         area2: "36000 sqft",
//         unitplan: {
//             image_2d: floor25,
//             image_3d: floor25,
//             sideContent: [
//                 {
//                     id: 1,
//                     title: "Lift Lobby",
//                     polygons: [
//                         {
//                             id: "dummy_1",
//                             polygon: "644,418,702,416,699,477,791,475,652,678,618,657,524,654,524,613,570,603,564,553,600,549,598,451,618,444,617,423"
//                         },
//                         {
//                             id: "dummy_1",
//                             polygon: "404,152,458,140,471,207,418,219"
//                         },
//                     ]
//                 },
//                 {
//                     id: 2,
//                     title: "AHU Room",
//                     polygons: [
//                         {
//                             id: "dummy_1",
//                             polygon: "583,115,625,106,638,172,595,178"
//                         },
//                         {
//                             id: "dummy_1",
//                             polygon: "323,419,386,418,387,505,323,506"
//                         },
//                     ]
//                 },
//                 {
//                     id: 3,
//                     title: "Staircase",
//                     polygons: [
//                         {
//                             id: "dummy_1",
//                             polygon: "530,447,598,448,598,549,529,548"
//                         },
//                         {
//                             id: "dummy_1",
//                             polygon: "461,142,564,122,577,185,473,207"
//                         },
//                     ]
//                 },
//                 {
//                     id: 4,
//                     title: "Gents Restroom",
//                     polygons: [
//                         {
//                             id: "dummy_1",
//                             polygon: "445,545,522,547,524,585,490,586,492,657,411,659,411,553,441,556"
//                         },
//                     ]
//                 },
//                 {
//                     id: 5,
//                     title: "Ladies Restroom",
//                     polygons: [
//                         {
//                             id: "dummy_1",
//                             polygon: "404,421,520,421,520,493,407,498"
//                         },
//                     ]
//                 },
//                 {
//                     id: 6,
//                     title: "Office Area",
//                     polygons: [
//                         {
//                             id: "dummy_1",
//                             polygon: "625,80,627,104,643,172,593,185,604,211,474,240,470,229,394,246,377,172,366,168,183,431,212,450,168,511,144,494,127,518,119,540,117,568,128,603,163,640,267,738,355,811,437,869,471,874,520,863,570,797,651,682,615,657,404,658,407,629,387,628,385,540,410,539,411,551,431,553,439,499,411,497,411,509,318,511,319,418,580,417,580,437,612,439,613,414,702,417,702,430,824,430,937,271,943,241,943,140,933,113,903,89,848,77,720,73"
//                         },
//                         {
//                             id: "dummy_1",
//                             polygon: "365,168,391,132,428,113,501,98,581,84,627,81,625,104,444,143,435,125,415,131,395,148,381,172"
//                         },
//                     ]
//                 },
//             ]
//         }
//     },
//     {
//         id: 24,
//         name: "24",
//         area: "12,000 sqft",
//         points: "726,701,726,717,949,713,1090,713,1246,713,1246,699",
//         gradientId: "grad10",
//         anchorX: 1246,
//         anchorY: 708,
//         floorname: "Podium 2",
//         area1: "12000 sqft",
//         area2: "36000 sqft",
//         unitplan: {
//             image_2d: floor24,
//             image_3d: floor24,
//             sideContent: [
//                 {
//                     id: 1,
//                     title: "Lift Lobby",
//                     polygons: [
//                         {
//                             id: "dummy_1",
//                             polygon: "644,418,702,416,699,477,791,475,652,678,618,657,524,654,524,613,570,603,564,553,600,549,598,451,618,444,617,423"
//                         },
//                         {
//                             id: "dummy_1",
//                             polygon: "404,152,458,140,471,207,418,219"
//                         },
//                     ]
//                 },
//                 {
//                     id: 2,
//                     title: "AHU Room",
//                     polygons: [
//                         {
//                             id: "dummy_1",
//                             polygon: "583,115,625,106,638,172,595,178"
//                         },
//                         {
//                             id: "dummy_1",
//                             polygon: "323,419,386,418,387,505,323,506"
//                         },
//                     ]
//                 },
//                 {
//                     id: 3,
//                     title: "Staircase",
//                     polygons: [
//                         {
//                             id: "dummy_1",
//                             polygon: "530,447,598,448,598,549,529,548"
//                         },
//                         {
//                             id: "dummy_1",
//                             polygon: "461,142,564,122,577,185,473,207"
//                         },
//                     ]
//                 },
//                 {
//                     id: 4,
//                     title: "Gents Restroom",
//                     polygons: [
//                         {
//                             id: "dummy_1",
//                             polygon: "445,545,522,547,524,585,490,586,492,657,411,659,411,553,441,556"
//                         },
//                     ]
//                 },
//                 {
//                     id: 5,
//                     title: "Ladies Restroom",
//                     polygons: [
//                         {
//                             id: "dummy_1",
//                             polygon: "404,421,520,421,520,493,407,498"
//                         },
//                     ]
//                 },
//                 {
//                     id: 6,
//                     title: "Office Area",
//                     polygons: [
//                         {
//                             id: "dummy_1",
//                             polygon: "625,80,627,104,643,172,593,185,604,211,474,240,470,229,394,246,377,172,366,168,183,431,212,450,168,511,144,494,127,518,119,540,117,568,128,603,163,640,267,738,355,811,437,869,471,874,520,863,570,797,651,682,615,657,404,658,407,629,387,628,385,540,410,539,411,551,431,553,439,499,411,497,411,509,318,511,319,418,580,417,580,437,612,439,613,414,702,417,702,430,824,430,937,271,943,241,943,140,933,113,903,89,848,77,720,73"
//                         },
//                         {
//                             id: "dummy_1",
//                             polygon: "365,168,391,132,428,113,501,98,581,84,627,81,625,104,444,143,435,125,415,131,395,148,381,172"
//                         },
//                     ]
//                 },
//             ]
//         }
//     },
//     {
//         id: 23,
//         name: "23",
//         area: "12,000 sqft",
//         points: "726,689,725,702,847,698,992,698,1111,698,1248,700,1248,684,1092,684,963,684,789,686",
//         gradientId: "grad10",
//         anchorX: 1246,
//         anchorY: 694,
//         floorname: "Podium 3",
//         area1: "12000 sqft",
//         area2: "36000 sqft",
//         unitplan: {
//             image_2d: floor23,
//             image_3d: floor23,
//             sideContent: [
//                 {
//                     id: 1,
//                     title: "Lift Lobby",
//                     polygons: [
//                         {
//                             id: "dummy_1",
//                             polygon: "644,418,702,416,699,477,791,475,652,678,618,657,524,654,524,613,570,603,564,553,600,549,598,451,618,444,617,423"
//                         },
//                         {
//                             id: "dummy_1",
//                             polygon: "404,152,458,140,471,207,418,219"
//                         },
//                     ]
//                 },
//                 {
//                     id: 2,
//                     title: "AHU Room",
//                     polygons: [
//                         {
//                             id: "dummy_1",
//                             polygon: "583,115,625,106,638,172,595,178"
//                         },
//                         {
//                             id: "dummy_1",
//                             polygon: "323,419,386,418,387,505,323,506"
//                         },
//                     ]
//                 },
//                 {
//                     id: 3,
//                     title: "Staircase",
//                     polygons: [
//                         {
//                             id: "dummy_1",
//                             polygon: "530,447,598,448,598,549,529,548"
//                         },
//                         {
//                             id: "dummy_1",
//                             polygon: "461,142,564,122,577,185,473,207"
//                         },
//                     ]
//                 },
//                 {
//                     id: 4,
//                     title: "Gents Restroom",
//                     polygons: [
//                         {
//                             id: "dummy_1",
//                             polygon: "445,545,522,547,524,585,490,586,492,657,411,659,411,553,441,556"
//                         },
//                     ]
//                 },
//                 {
//                     id: 5,
//                     title: "Ladies Restroom",
//                     polygons: [
//                         {
//                             id: "dummy_1",
//                             polygon: "404,421,520,421,520,493,407,498"
//                         },
//                     ]
//                 },
//                 {
//                     id: 6,
//                     title: "Office Area",
//                     polygons: [
//                         {
//                             id: "dummy_1",
//                             polygon: "625,80,627,104,643,172,593,185,604,211,474,240,470,229,394,246,377,172,366,168,183,431,212,450,168,511,144,494,127,518,119,540,117,568,128,603,163,640,267,738,355,811,437,869,471,874,520,863,570,797,651,682,615,657,404,658,407,629,387,628,385,540,410,539,411,551,431,553,439,499,411,497,411,509,318,511,319,418,580,417,580,437,612,439,613,414,702,417,702,430,824,430,937,271,943,241,943,140,933,113,903,89,848,77,720,73"
//                         },
//                         {
//                             id: "dummy_1",
//                             polygon: "365,168,391,132,428,113,501,98,581,84,627,81,625,104,444,143,435,125,415,131,395,148,381,172"
//                         },
//                     ]
//                 },
//             ]
//         }
//     },
//     {
//         id: 22,
//         name: "22",
//         area: "12,000 sqft",
//         points: "730,675,726,689,933,687,1153,684,1246,684,1246,670,1054,672,873,672",
//         gradientId: "grad10",
//         anchorX: 1246,
//         anchorY: 680,
//         floorname: "Podium 4",
//         area1: "12000 sqft",
//         area2: "36000 sqft",
//         unitplan: {
//             image_2d: floor22,
//             image_3d: floor22,
//             sideContent: [
//                 {
//                     id: 1,
//                     title: "Lift Lobby",
//                     polygons: [
//                         {
//                             id: "dummy_1",
//                             polygon: "644,418,702,416,699,477,791,475,652,678,618,657,524,654,524,613,570,603,564,553,600,549,598,451,618,444,617,423"
//                         },
//                         {
//                             id: "dummy_1",
//                             polygon: "404,152,458,140,471,207,418,219"
//                         },
//                     ]
//                 },
//                 {
//                     id: 2,
//                     title: "AHU Room",
//                     polygons: [
//                         {
//                             id: "dummy_1",
//                             polygon: "583,115,625,106,638,172,595,178"
//                         },
//                         {
//                             id: "dummy_1",
//                             polygon: "323,419,386,418,387,505,323,506"
//                         },
//                     ]
//                 },
//                 {
//                     id: 3,
//                     title: "Staircase",
//                     polygons: [
//                         {
//                             id: "dummy_1",
//                             polygon: "530,447,598,448,598,549,529,548"
//                         },
//                         {
//                             id: "dummy_1",
//                             polygon: "461,142,564,122,577,185,473,207"
//                         },
//                     ]
//                 },
//                 {
//                     id: 4,
//                     title: "Gents Restroom",
//                     polygons: [
//                         {
//                             id: "dummy_1",
//                             polygon: "445,545,522,547,524,585,490,586,492,657,411,659,411,553,441,556"
//                         },
//                     ]
//                 },
//                 {
//                     id: 5,
//                     title: "Ladies Restroom",
//                     polygons: [
//                         {
//                             id: "dummy_1",
//                             polygon: "404,421,520,421,520,493,407,498"
//                         },
//                     ]
//                 },
//                 {
//                     id: 6,
//                     title: "Office Area",
//                     polygons: [
//                         {
//                             id: "dummy_1",
//                             polygon: "625,80,627,104,643,172,593,185,604,211,474,240,470,229,394,246,377,172,366,168,183,431,212,450,168,511,144,494,127,518,119,540,117,568,128,603,163,640,267,738,355,811,437,869,471,874,520,863,570,797,651,682,615,657,404,658,407,629,387,628,385,540,410,539,411,551,431,553,439,499,411,497,411,509,318,511,319,418,580,417,580,437,612,439,613,414,702,417,702,430,824,430,937,271,943,241,943,140,933,113,903,89,848,77,720,73"
//                         },
//                         {
//                             id: "dummy_1",
//                             polygon: "365,168,391,132,428,113,501,98,581,84,627,81,625,104,444,143,435,125,415,131,395,148,381,172"
//                         },
//                     ]
//                 },
//             ]
//         }
//     },
//     {
//         id: 21,
//         name: "21",
//         area: "12,000 sqft",
//         points: "726,659,728,675,1248,671,1248,652,1003,652,833,654",
//         gradientId: "grad10",
//         anchorX: 1246,
//         anchorY: 662,
//         floorname: "Podium 5",
//         area1: "12000 sqft",
//         area2: "36000 sqft",
//         unitplan: {
//             image_2d: floor21,
//             image_3d: floor21,
//             sideContent: [
//                 {
//                     id: 1,
//                     title: "Lift Lobby",
//                     polygons: [
//                         {
//                             id: "dummy_1",
//                             polygon: "644,418,702,416,699,477,791,475,652,678,618,657,524,654,524,613,570,603,564,553,600,549,598,451,618,444,617,423"
//                         },
//                         {
//                             id: "dummy_1",
//                             polygon: "404,152,458,140,471,207,418,219"
//                         },
//                     ]
//                 },
//                 {
//                     id: 2,
//                     title: "AHU Room",
//                     polygons: [
//                         {
//                             id: "dummy_1",
//                             polygon: "583,115,625,106,638,172,595,178"
//                         },
//                         {
//                             id: "dummy_1",
//                             polygon: "323,419,386,418,387,505,323,506"
//                         },
//                     ]
//                 },
//                 {
//                     id: 3,
//                     title: "Staircase",
//                     polygons: [
//                         {
//                             id: "dummy_1",
//                             polygon: "530,447,598,448,598,549,529,548"
//                         },
//                         {
//                             id: "dummy_1",
//                             polygon: "461,142,564,122,577,185,473,207"
//                         },
//                     ]
//                 },
//                 {
//                     id: 4,
//                     title: "Gents Restroom",
//                     polygons: [
//                         {
//                             id: "dummy_1",
//                             polygon: "445,545,522,547,524,585,490,586,492,657,411,659,411,553,441,556"
//                         },
//                     ]
//                 },
//                 {
//                     id: 5,
//                     title: "Ladies Restroom",
//                     polygons: [
//                         {
//                             id: "dummy_1",
//                             polygon: "404,421,520,421,520,493,407,498"
//                         },
//                     ]
//                 },
//             ]
//         }
//     },
//     {
//         id: 20,
//         name: "Podium 6",
//         area: "12,000 sqft",
//         points: "728,642,847,635,982,635,1145,635,1216,637,1248,639,1248,653,998,651,844,653,767,656,730,660",
//         gradientId: "grad10",
//         anchorX: 1246,
//         anchorY: 650,
//         floorname: "Podium 6",
//         area1: "12000 sqft",
//         area2: "36000 sqft",
//         unitplan: {
//             image_2d: floor6,
//             image_3d: floor6,
//             sideContent: [
//                 {
//                     id: 1,
//                     title: "dummy",
//                     polygons: [
//                         {
//                             id: "dummy_1",
//                             polygon: "455,66,788,8999,"
//                         }
//                     ]
//                 }
//             ]
//         }
//     },
//     {
//         id: 19,
//         name: "Floor 19",
//         area: "68,000 sqft",
//         points: "725,111,746,78,791,80,928,106,1066,132,1094,152,1071,153,900,127,767,110,723,125",
//         gradientId: "grad10",
//         anchorX: 1116,
//         anchorY: 140,
//         floorname: "19",
//         area1: "12000 sqft",
//         area2: "36000 sqft",
//         unitplan: {
//             image_2d: floor19,
//             image_3d: floor19,
//             sideContent: [
//                 {
//                     id: 1,
//                     title: "dummy",
//                     polygons: [
//                         {
//                             id: "dummy_1",
//                             polygon: "455,66,788,8999,"
//                         }
//                     ]
//                 }
//             ]
//         }
//     },
//     {
//         id: 18,
//         name: "Floor 18",
//         area: "68,000 sqft",
//         points: "726,124,768,110,901,131,1089,155,1085,164,1033,164,749,131,726,138",
//         gradientId: "grad10",
//         anchorX: 1100,
//         anchorY: 155,
//         floorname: "18",
//         area1: "12000 sqft",
//         area2: "36000 sqft",
//         unitplan: {
//             image_2d: floor18,
//             image_3d: floor18,
//             sideContent: [
//                 {
//                     id: 1,
//                     title: "dummy",
//                     polygons: [
//                         {
//                             id: "dummy_1",
//                             polygon: "455,66,788,8999,"
//                         }
//                     ]
//                 }
//             ]
//         }
//     },
//     {
//         id: 17,
//         name: "Floor 17",
//         area: "68,000 sqft",
//         points: "726,139,753,129,805,136,910,148,987,160,961,164,912,167,861,167,767,153,728,160",
//         gradientId: "grad10",
//         anchorX: 975,
//         anchorY: 155,
//         floorname: "17",
//         area1: "12000 sqft",
//         area2: "36000 sqft",
//         unitplan: {
//             image_2d: floor17,
//             image_3d: floor17,
//             sideContent: [
//                 {
//                     id: 1,
//                     title: "dummy",
//                     polygons: [
//                         {
//                             id: "dummy_1",
//                             polygon: "455,66,788,8999,"
//                         }
//                     ]
//                 }
//             ]
//         }
//     },
//     {
//         id: 16,
//         name: "Floor 16",
//         area: "68,000 sqft",
//         points: "730,162,753,153,768,153,863,167,842,174,796,186,754,179,730,195",
//         gradientId: "grad10",
//         anchorX: 886,
//         anchorY: 160,
//         floorname: "16",
//         area1: "12000 sqft",
//         area2: "36000 sqft",
//         unitplan: {
//             image_2d: floor16,
//             image_3d: floor16,
//             sideContent: [
//                 {
//                     id: 1,
//                     title: "dummy",
//                     polygons: [
//                         {
//                             id: "dummy_1",
//                             polygon: "455,66,788,8999,"
//                         }
//                     ]
//                 }
//             ]
//         }
//     },
//     {
//         id: 15,
//         name: "Floor 15",
//         area: "68,000 sqft",
//         points: "725,197,754,181,798,185,777,199,739,223,725,242",
//         gradientId: "grad10",
//         anchorX: 846,
//         anchorY: 180,
//         floorname: "15",
//         area1: "12000 sqft",
//         area2: "36000 sqft",
//         unitplan: {
//             image_2d: floor15,
//             image_3d: floor15,
//             sideContent: [
//                 {
//                     id: 1,
//                     title: "Lift Lobby",
//                     polygons: [
//                         {
//                             id: "dummy_1",
//                             polygon: "601,443,643,440,643,392,954,391,955,501,887,502,887,608,841,607,840,655,524,659,526,552,601,549"
//                         },
//                         {
//                             id: "dummy_1",
//                             polygon: "404,152,458,140,471,207,418,219"
//                         }
//                     ]
//                 },
//                 {
//                     id: 2,
//                     title: "AHU Room",
//                     polygons: [
//                         {
//                             id: "dummy_1",
//                             polygon: "318,423,383,423,382,509,319,509"
//                         },
//                         {
//                             id: "dummy_1",
//                             polygon: "317,543,382,543,381,627,317,629"
//                         },
//                         {
//                             id: "dummy_1",
//                             polygon: "1114,422,1179,423,1178,506,1114,509"
//                         },
//                         {
//                             id: "dummy_1",
//                             polygon: "1114,543,1178,541,1178,628,1114,627"
//                         }
//                     ]
//                 },{
//                     id: 3,
//                     title: "Staircase",
//                     polygons: [
//                         {
//                             id: "dummy_1",
//                             polygon: "530,447,598,448,598,549,529,548"
//                         },
//                         {
//                             id: "dummy_1",
//                             polygon: "888,503,954,503,956,603,888,604,"
//                         },
//                         {
//                             id: "dummy_1",
//                             polygon: "461,142,564,122,577,185,473,207"
//                         },
//                     ]
//                 },
//                 {
//                     id: 4,
//                     title: "Gents Restroom",
//                     polygons: [
//                         {
//                             id: "dummy_1",
//                             polygon: "997,395,1089,395,1090,434,1073,439,1072,461,1089,465,1090,505,966,505,967,464,997,457"
//                         },
//                         {
//                             id: "dummy_1",
//                             polygon: "406,556,433,556,433,572,441,573,441,551,517,548,516,589,487,590,487,659,406,659"
//                         },
//                     ]
//                 },
//                 {
//                     id: 5,
//                     title: "Ladies Restroom",
//                     polygons: [
//                         {
//                             id: "dummy_1",
//                             polygon: "963,557,1068,558,1068,545,1089,547,1094,625,963,627"
//                         },
//                         {
//                             id: "dummy_1",
//                             polygon: "404,421,520,421,520,493,407,498"
//                         },
//                     ]
//                 },
//                 {
//                     id: 6,
//                     title: "Office Area",
//                     polygons: [
//                         {
//                             id: "dummy_1",
//                             polygon: "585,84,588,127,565,136,576,188,521,201,526,226,470,245,464,231,383,250,363,155,388,148,378,124,206,183,129,220,80,262,41,322,25,381,24,440,36,499,66,550,129,623,196,686,261,747,346,815,467,899,557,947,564,663,483,665,403,665,404,631,314,629,315,416,638,419,640,391,631,83"
//                         },
//                         {
//                             id: "dummy_1",
//                             polygon: "631,81,747,77,866,81,1014,102,1114,127,1270,180,1357,220,1406,266,1444,334,1457,393,1449,471,1428,526,1363,607,1287,682,1128,819,1007,903,924,941,836,971,736,981,640,970,559,946,563,663,656,662,846,662,845,632,1184,627,1183,418,1093,421,1093,387,640,388"
//                         },
//                     ]
//                 },
//             ]
//         }
//     },
//     {
//         id: 14,
//         name: "Floor 14",
//         area: "68,000 sqft",
//         points: "723,279,747,244,788,211,859,192,977,183,1094,185,1192,194,1222,201,1246,220,1248,241,1160,226,1029,219,898,223,809,240,726,302",
//         gradientId: "grad10",
//         anchorX: 1246,
//         anchorY: 225,
//         floorname: "14",
//         area1: "12000 sqft",
//         area2: "36000 sqft",
//         unitplan: {
//             image_2d: floor14,
//             image_3d: floor14,
//             sideContent: [
//                 {
//                     id: 1,
//                     title: "dummy",
//                     polygons: [
//                         {
//                             id: "dummy_1",
//                             polygon: "455,66,788,8999,"
//                         }
//                     ]
//                 }
//             ]
//         }
//     },
//     {
//         id: 13,
//         name: "Floor 13",
//         area: "68,000 sqft",
//         points: "726,304,767,267,809,239,870,228,949,219,1033,219,1117,223,1173,228,1225,237,1246,239,1246,267,1118,258,985,260,858,276,779,297,728,320",
//         gradientId: "grad10",
//         anchorX: 1246,
//         anchorY: 250,
//         floorname: "13",
//         area1: "12000 sqft",
//         area2: "36000 sqft",
//         unitplan: {
//             image_2d: floor13,
//             image_3d: floor13,
//             sideContent: [
//                 {
//                     id: 1,
//                     title: "Lift Lobby",
//                     polygons: [
//                         {
//                             id: "dummy_1",
//                             polygon: "601,443,643,440,643,392,954,391,955,501,887,502,887,608,841,607,840,655,524,659,526,552,601,549"
//                         },
//                         {
//                             id: "dummy_1",
//                             polygon: "404,152,458,140,471,207,418,219"
//                         }
//                     ]
//                 },
//                 {
//                     id: 2,
//                     title: "AHU Room",
//                     polygons: [
//                         {
//                             id: "dummy_1",
//                             polygon: "318,423,383,423,382,509,319,509"
//                         },
//                         {
//                             id: "dummy_1",
//                             polygon: "317,543,382,543,381,627,317,629"
//                         },
//                         {
//                             id: "dummy_1",
//                             polygon: "1114,422,1179,423,1178,506,1114,509"
//                         },
//                         {
//                             id: "dummy_1",
//                             polygon: "1114,543,1178,541,1178,628,1114,627"
//                         }
//                     ]
//                 },{
//                     id: 3,
//                     title: "Staircase",
//                     polygons: [
//                         {
//                             id: "dummy_1",
//                             polygon: "530,447,598,448,598,549,529,548"
//                         },
//                         {
//                             id: "dummy_1",
//                             polygon: "888,503,954,503,956,603,888,604,"
//                         },
//                         {
//                             id: "dummy_1",
//                             polygon: "461,142,564,122,577,185,473,207"
//                         },
//                     ]
//                 },
//                 {
//                     id: 4,
//                     title: "Gents Restroom",
//                     polygons: [
//                         {
//                             id: "dummy_1",
//                             polygon: "997,395,1089,395,1090,434,1073,439,1072,461,1089,465,1090,505,966,505,967,464,997,457"
//                         },
//                         {
//                             id: "dummy_1",
//                             polygon: "406,556,433,556,433,572,441,573,441,551,517,548,516,589,487,590,487,659,406,659"
//                         },
//                     ]
//                 },
//                 {
//                     id: 5,
//                     title: "Ladies Restroom",
//                     polygons: [
//                         {
//                             id: "dummy_1",
//                             polygon: "963,557,1068,558,1068,545,1089,547,1094,625,963,627"
//                         },
//                         {
//                             id: "dummy_1",
//                             polygon: "404,421,520,421,520,493,407,498"
//                         },
//                     ]
//                 },
//                 {
//                     id: 6,
//                     title: "Office Area",
//                     polygons: [
//                         {
//                             id: "dummy_1",
//                             polygon: "585,84,588,127,565,136,576,188,521,201,526,226,470,245,464,231,383,250,363,155,388,148,378,124,206,183,129,220,80,262,41,322,25,381,24,440,36,499,66,550,129,623,196,686,261,747,346,815,467,899,557,947,564,663,483,665,403,665,404,631,314,629,315,416,638,419,640,391,631,83"
//                         },
//                         {
//                             id: "dummy_1",
//                             polygon: "631,81,747,77,866,81,1014,102,1114,127,1270,180,1357,220,1406,266,1444,334,1457,393,1449,471,1428,526,1363,607,1287,682,1128,819,1007,903,924,941,836,971,736,981,640,970,559,946,563,663,656,662,846,662,845,632,1184,627,1183,418,1093,421,1093,387,640,388"
//                         },
//                     ]
//                 },
//             ]
//         }
//     },
//     {
//         id: 12,
//         name: "Floor 12",
//         area: "12,000 sqft",
//         points: "725,321,854,271,952,259,1096,257,1248,268,1248,297,1103,284,961,289,795,317,728,345",
//         gradientId: "grad10",
//         anchorX: 1246,
//         anchorY: 280,
//         floorname: "12",
//         area1: "12000 sqft",
//         area2: "36000 sqft",
//         unitplan: {
//             image_2d: floor12,
//             image_3d: floor12,
//             sideContent: [
//                 {
//                     id: 1,
//                     title: "Lift Lobby",
//                     polygons: [
//                         {
//                             id: "dummy_1",
//                             polygon: "601,443,643,440,643,392,954,391,955,501,887,502,887,608,841,607,840,655,524,659,526,552,601,549"
//                         },
//                         {
//                             id: "dummy_1",
//                             polygon: "404,152,458,140,471,207,418,219"
//                         }
//                     ]
//                 },
//                 {
//                     id: 2,
//                     title: "AHU Room",
//                     polygons: [
//                         {
//                             id: "dummy_1",
//                             polygon: "318,423,383,423,382,509,319,509"
//                         },
//                         {
//                             id: "dummy_1",
//                             polygon: "317,543,382,543,381,627,317,629"
//                         },
//                         {
//                             id: "dummy_1",
//                             polygon: "1114,422,1179,423,1178,506,1114,509"
//                         },
//                         {
//                             id: "dummy_1",
//                             polygon: "1114,543,1178,541,1178,628,1114,627"
//                         }
//                     ]
//                 },{
//                     id: 3,
//                     title: "Staircase",
//                     polygons: [
//                         {
//                             id: "dummy_1",
//                             polygon: "530,447,598,448,598,549,529,548"
//                         },
//                         {
//                             id: "dummy_1",
//                             polygon: "888,503,954,503,956,603,888,604,"
//                         },
//                         {
//                             id: "dummy_1",
//                             polygon: "461,142,564,122,577,185,473,207"
//                         },
//                     ]
//                 },
//                 {
//                     id: 4,
//                     title: "Gents Restroom",
//                     polygons: [
//                         {
//                             id: "dummy_1",
//                             polygon: "997,395,1089,395,1090,434,1073,439,1072,461,1089,465,1090,505,966,505,967,464,997,457"
//                         },
//                         {
//                             id: "dummy_1",
//                             polygon: "406,556,433,556,433,572,441,573,441,551,517,548,516,589,487,590,487,659,406,659"
//                         },
//                     ]
//                 },
//                 {
//                     id: 5,
//                     title: "Ladies Restroom",
//                     polygons: [
//                         {
//                             id: "dummy_1",
//                             polygon: "963,557,1068,558,1068,545,1089,547,1094,625,963,627"
//                         },
//                         {
//                             id: "dummy_1",
//                             polygon: "404,421,520,421,520,493,407,498"
//                         },
//                     ]
//                 },
//                 {
//                     id: 6,
//                     title: "Office Area",
//                     polygons: [
//                         {
//                             id: "dummy_1",
//                             polygon: "585,84,588,127,565,136,576,188,521,201,526,226,470,245,464,231,383,250,363,155,388,148,378,124,206,183,129,220,80,262,41,322,25,381,24,440,36,499,66,550,129,623,196,686,261,747,346,815,467,899,557,947,564,663,483,665,403,665,404,631,314,629,315,416,638,419,640,391,631,83"
//                         },
//                         {
//                             id: "dummy_1",
//                             polygon: "631,81,747,77,866,81,1014,102,1114,127,1270,180,1357,220,1406,266,1444,334,1457,393,1449,471,1428,526,1363,607,1287,682,1128,819,1007,903,924,941,836,971,736,981,640,970,559,946,563,663,656,662,846,662,845,632,1184,627,1183,418,1093,421,1093,387,640,388"
//                         },
//                     ]
//                 },
//             ]
//         }
//     },
//     {
//         id: 11,
//         name: "Floor 11",
//         area: "12,000 sqft",
//         points: "726,341,859,299,973,287,1090,285,1176,289,1248,298,1248,329,1162,317,1057,315,914,324,800,343,728,366",
//         gradientId: "grad10",
//         anchorX: 1246,
//         anchorY: 310,
//         floorname: "11",
//         area1: "12000 sqft",
//         area2: "36000 sqft",
//         unitplan: {
//             image_2d: floor11,
//             image_3d: floor11,
//             sideContent: [
//                 {
//                     id: 1,
//                     title: "Lift Lobby",
//                     polygons: [
//                         {
//                             id: "dummy_1",
//                             polygon: "601,443,643,440,643,392,954,391,955,501,887,502,887,608,841,607,840,655,524,659,526,552,601,549"
//                         },
//                         {
//                             id: "dummy_1",
//                             polygon: "404,152,458,140,471,207,418,219"
//                         }
//                     ]
//                 },
//                 {
//                     id: 2,
//                     title: "AHU Room",
//                     polygons: [
//                         {
//                             id: "dummy_1",
//                             polygon: "318,423,383,423,382,509,319,509"
//                         },
//                         {
//                             id: "dummy_1",
//                             polygon: "317,543,382,543,381,627,317,629"
//                         },
//                         {
//                             id: "dummy_1",
//                             polygon: "1114,422,1179,423,1178,506,1114,509"
//                         },
//                         {
//                             id: "dummy_1",
//                             polygon: "1114,543,1178,541,1178,628,1114,627"
//                         }
//                     ]
//                 },{
//                     id: 3,
//                     title: "Staircase",
//                     polygons: [
//                         {
//                             id: "dummy_1",
//                             polygon: "530,447,598,448,598,549,529,548"
//                         },
//                         {
//                             id: "dummy_1",
//                             polygon: "888,503,954,503,956,603,888,604,"
//                         },
//                         {
//                             id: "dummy_1",
//                             polygon: "461,142,564,122,577,185,473,207"
//                         },
//                     ]
//                 },
//                 {
//                     id: 4,
//                     title: "Gents Restroom",
//                     polygons: [
//                         {
//                             id: "dummy_1",
//                             polygon: "997,395,1089,395,1090,434,1073,439,1072,461,1089,465,1090,505,966,505,967,464,997,457"
//                         },
//                         {
//                             id: "dummy_1",
//                             polygon: "406,556,433,556,433,572,441,573,441,551,517,548,516,589,487,590,487,659,406,659"
//                         },
//                     ]
//                 },
//                 {
//                     id: 5,
//                     title: "Ladies Restroom",
//                     polygons: [
//                         {
//                             id: "dummy_1",
//                             polygon: "963,557,1068,558,1068,545,1089,547,1094,625,963,627"
//                         },
//                         {
//                             id: "dummy_1",
//                             polygon: "404,421,520,421,520,493,407,498"
//                         },
//                     ]
//                 },
//                 {
//                     id: 6,
//                     title: "Office Area",
//                     polygons: [
//                         {
//                             id: "dummy_1",
//                             polygon: "585,84,588,127,565,136,576,188,521,201,526,226,470,245,464,231,383,250,363,155,388,148,378,124,206,183,129,220,80,262,41,322,25,381,24,440,36,499,66,550,129,623,196,686,261,747,346,815,467,899,557,947,564,663,483,665,403,665,404,631,314,629,315,416,638,419,640,391,631,83"
//                         },
//                         {
//                             id: "dummy_1",
//                             polygon: "631,81,747,77,866,81,1014,102,1114,127,1270,180,1357,220,1406,266,1444,334,1457,393,1449,471,1428,526,1363,607,1287,682,1128,819,1007,903,924,941,836,971,736,981,640,970,559,946,563,663,656,662,846,662,845,632,1184,627,1183,418,1093,421,1093,387,640,388"
//                         },
//                     ]
//                 },
//             ]
//         }
//     },
//     {
//         id: 10,
//         name: "Floor 10",
//         area: "12,000 sqft",
//         points: "728,366,845,333,952,319,1069,315,1174,319,1248,329,1246,361,1164,352,1078,352,973,350,884,355,814,373,730,396",
//         gradientId: "grad10",
//         anchorX: 1246,
//         anchorY: 345,
//         floorname: "10",
//         area1: "12000 sqft",
//         area2: "36000 sqft",
//         unitplan: {
//             image_2d: floor10,
//             image_3d: floor10,
//             sideContent: [
//                 {
//                     id: 1,
//                     title: "Lift Lobby",
//                     polygons: [
//                         {
//                             id: "dummy_1",
//                             polygon: "601,443,643,440,643,392,954,391,955,501,887,502,887,608,841,607,840,655,524,659,526,552,601,549"
//                         },
//                         {
//                             id: "dummy_1",
//                             polygon: "404,152,458,140,471,207,418,219"
//                         }
//                     ]
//                 },
//                 {
//                     id: 2,
//                     title: "AHU Room",
//                     polygons: [
//                         {
//                             id: "dummy_1",
//                             polygon: "318,423,383,423,382,509,319,509"
//                         },
//                         {
//                             id: "dummy_1",
//                             polygon: "317,543,382,543,381,627,317,629"
//                         },
//                         {
//                             id: "dummy_1",
//                             polygon: "1114,422,1179,423,1178,506,1114,509"
//                         },
//                         {
//                             id: "dummy_1",
//                             polygon: "1114,543,1178,541,1178,628,1114,627"
//                         }
//                     ]
//                 },{
//                     id: 3,
//                     title: "Staircase",
//                     polygons: [
//                         {
//                             id: "dummy_1",
//                             polygon: "530,447,598,448,598,549,529,548"
//                         },
//                         {
//                             id: "dummy_1",
//                             polygon: "888,503,954,503,956,603,888,604,"
//                         },
//                         {
//                             id: "dummy_1",
//                             polygon: "461,142,564,122,577,185,473,207"
//                         },
//                     ]
//                 },
//                 {
//                     id: 4,
//                     title: "Gents Restroom",
//                     polygons: [
//                         {
//                             id: "dummy_1",
//                             polygon: "997,395,1089,395,1090,434,1073,439,1072,461,1089,465,1090,505,966,505,967,464,997,457"
//                         },
//                         {
//                             id: "dummy_1",
//                             polygon: "406,556,433,556,433,572,441,573,441,551,517,548,516,589,487,590,487,659,406,659"
//                         },
//                     ]
//                 },
//                 {
//                     id: 5,
//                     title: "Ladies Restroom",
//                     polygons: [
//                         {
//                             id: "dummy_1",
//                             polygon: "963,557,1068,558,1068,545,1089,547,1094,625,963,627"
//                         },
//                         {
//                             id: "dummy_1",
//                             polygon: "404,421,520,421,520,493,407,498"
//                         },
//                     ]
//                 },
//                 {
//                     id: 6,
//                     title: "Office Area",
//                     polygons: [
//                         {
//                             id: "dummy_1",
//                             polygon: "585,84,588,127,565,136,576,188,521,201,526,226,470,245,464,231,383,250,363,155,388,148,378,124,206,183,129,220,80,262,41,322,25,381,24,440,36,499,66,550,129,623,196,686,261,747,346,815,467,899,557,947,564,663,483,665,403,665,404,631,314,629,315,416,638,419,640,391,631,83"
//                         },
//                         {
//                             id: "dummy_1",
//                             polygon: "631,81,747,77,866,81,1014,102,1114,127,1270,180,1357,220,1406,266,1444,334,1457,393,1449,471,1428,526,1363,607,1287,682,1128,819,1007,903,924,941,836,971,736,981,640,970,559,946,563,663,656,662,846,662,845,632,1184,627,1183,418,1093,421,1093,387,640,388"
//                         },
//                     ]
//                 },
//             ]
//         }
//     },
//     {
//         id: 9,
//         name: "Floor 9",
//         area: "12,000 sqft",
//         points: "730,398,849,362,982,350,1150,350,1244,357,1248,388,1080,381,921,385,730,422",
//         gradientId: "grad9",
//         anchorX: 1240,
//         anchorY: 370,
//         floorname: "9",
//         area1: "12000 sqft",
//         area2: "36000 sqft",
//         unitplan: {
//             image_2d: floor9,
//             image_3d: floor9,
//             sideContent: [
//                 {
//                     id: 1,
//                     title: "Lift Lobby",
//                     polygons: [
//                         {
//                             id: "dummy_1",
//                             polygon: "601,443,643,440,643,392,954,391,955,501,887,502,887,608,841,607,840,655,524,659,526,552,601,549"
//                         },
//                         {
//                             id: "dummy_1",
//                             polygon: "404,152,458,140,471,207,418,219"
//                         }
//                     ]
//                 },
//                 {
//                     id: 2,
//                     title: "AHU Room",
//                     polygons: [
//                         {
//                             id: "dummy_1",
//                             polygon: "318,423,383,423,382,509,319,509"
//                         },
//                         {
//                             id: "dummy_1",
//                             polygon: "317,543,382,543,381,627,317,629"
//                         },
//                         {
//                             id: "dummy_1",
//                             polygon: "1114,422,1179,423,1178,506,1114,509"
//                         },
//                         {
//                             id: "dummy_1",
//                             polygon: "1114,543,1178,541,1178,628,1114,627"
//                         }
//                     ]
//                 },{
//                     id: 3,
//                     title: "Staircase",
//                     polygons: [
//                         {
//                             id: "dummy_1",
//                             polygon: "530,447,598,448,598,549,529,548"
//                         },
//                         {
//                             id: "dummy_1",
//                             polygon: "888,503,954,503,956,603,888,604,"
//                         },
//                         {
//                             id: "dummy_1",
//                             polygon: "461,142,564,122,577,185,473,207"
//                         },
//                     ]
//                 },
//                 {
//                     id: 4,
//                     title: "Gents Restroom",
//                     polygons: [
//                         {
//                             id: "dummy_1",
//                             polygon: "997,395,1089,395,1090,434,1073,439,1072,461,1089,465,1090,505,966,505,967,464,997,457"
//                         },
//                         {
//                             id: "dummy_1",
//                             polygon: "406,556,433,556,433,572,441,573,441,551,517,548,516,589,487,590,487,659,406,659"
//                         },
//                     ]
//                 },
//                 {
//                     id: 5,
//                     title: "Ladies Restroom",
//                     polygons: [
//                         {
//                             id: "dummy_1",
//                             polygon: "963,557,1068,558,1068,545,1089,547,1094,625,963,627"
//                         },
//                         {
//                             id: "dummy_1",
//                             polygon: "404,421,520,421,520,493,407,498"
//                         },
//                     ]
//                 },
//                 {
//                     id: 6,
//                     title: "Office Area",
//                     polygons: [
//                         {
//                             id: "dummy_1",
//                             polygon: "585,84,588,127,565,136,576,188,521,201,526,226,470,245,464,231,383,250,363,155,388,148,378,124,206,183,129,220,80,262,41,322,25,381,24,440,36,499,66,550,129,623,196,686,261,747,346,815,467,899,557,947,564,663,483,665,403,665,404,631,314,629,315,416,638,419,640,391,631,83"
//                         },
//                         {
//                             id: "dummy_1",
//                             polygon: "631,81,747,77,866,81,1014,102,1114,127,1270,180,1357,220,1406,266,1444,334,1457,393,1449,471,1428,526,1363,607,1287,682,1128,819,1007,903,924,941,836,971,736,981,640,970,559,946,563,663,656,662,846,662,845,632,1184,627,1183,418,1093,421,1093,387,640,388"
//                         },
//                     ]
//                 },
//             ]
//         }
//     },
//     {
//         id: 8,
//         name: "Floor 8",
//         area: "12,000 sqft",
//         points: "730,420,854,391,980,382,1094,382,1211,385,1248,387,1248,419,1117,415,1012,413,910,415,816,427,730,445",
//         gradientId: "grad8",
//         anchorX: 1237,
//         anchorY: 400,
//         floorname: "8",
//         area1: "12000 sqft",
//         area2: "36000 sqft",
//         unitplan: {
//             image_2d: floor8,
//             image_3d: floor8,
//             sideContent: [
//                 {
//                     id: 1,
//                     title: "Lift Lobby",
//                     polygons: [
//                         {
//                             id: "dummy_1",
//                             polygon: "601,443,643,440,643,392,954,391,955,501,887,502,887,608,841,607,840,655,524,659,526,552,601,549"
//                         },
//                         {
//                             id: "dummy_1",
//                             polygon: "404,152,458,140,471,207,418,219"
//                         }
//                     ]
//                 },
//                 {
//                     id: 2,
//                     title: "AHU Room",
//                     polygons: [
//                         {
//                             id: "dummy_1",
//                             polygon: "318,423,383,423,382,509,319,509"
//                         },
//                         {
//                             id: "dummy_1",
//                             polygon: "317,543,382,543,381,627,317,629"
//                         },
//                         {
//                             id: "dummy_1",
//                             polygon: "1114,422,1179,423,1178,506,1114,509"
//                         },
//                         {
//                             id: "dummy_1",
//                             polygon: "1114,543,1178,541,1178,628,1114,627"
//                         }
//                     ]
//                 },{
//                     id: 3,
//                     title: "Staircase",
//                     polygons: [
//                         {
//                             id: "dummy_1",
//                             polygon: "530,447,598,448,598,549,529,548"
//                         },
//                         {
//                             id: "dummy_1",
//                             polygon: "888,503,954,503,956,603,888,604,"
//                         },
//                         {
//                             id: "dummy_1",
//                             polygon: "461,142,564,122,577,185,473,207"
//                         },
//                     ]
//                 },
//                 {
//                     id: 4,
//                     title: "Gents Restroom",
//                     polygons: [
//                         {
//                             id: "dummy_1",
//                             polygon: "997,395,1089,395,1090,434,1073,439,1072,461,1089,465,1090,505,966,505,967,464,997,457"
//                         },
//                         {
//                             id: "dummy_1",
//                             polygon: "406,556,433,556,433,572,441,573,441,551,517,548,516,589,487,590,487,659,406,659"
//                         },
//                     ]
//                 },
//                 {
//                     id: 5,
//                     title: "Ladies Restroom",
//                     polygons: [
//                         {
//                             id: "dummy_1",
//                             polygon: "963,557,1068,558,1068,545,1089,547,1094,625,963,627"
//                         },
//                         {
//                             id: "dummy_1",
//                             polygon: "404,421,520,421,520,493,407,498"
//                         },
//                     ]
//                 },
//                 {
//                     id: 6,
//                     title: "Office Area",
//                     polygons: [
//                         {
//                             id: "dummy_1",
//                             polygon: "585,84,588,127,565,136,576,188,521,201,526,226,470,245,464,231,383,250,363,155,388,148,378,124,206,183,129,220,80,262,41,322,25,381,24,440,36,499,66,550,129,623,196,686,261,747,346,815,467,899,557,947,564,663,483,665,403,665,404,631,314,629,315,416,638,419,640,391,631,83"
//                         },
//                         {
//                             id: "dummy_1",
//                             polygon: "631,81,747,77,866,81,1014,102,1114,127,1270,180,1357,220,1406,266,1444,334,1457,393,1449,471,1428,526,1363,607,1287,682,1128,819,1007,903,924,941,836,971,736,981,640,970,559,946,563,663,656,662,846,662,845,632,1184,627,1183,418,1093,421,1093,387,640,388"
//                         },
//                     ]
//                 },
//             ]
//         }
//     },
//     {
//         id: 7,
//         name: "Floor 7",
//         area: "12,000 sqft",
//         points: "726,447,824,427,921,415,1052,410,1150,415,1244,419,1246,452,1083,443,977,445,893,448,803,459,726,473",
//         gradientId: "grad7",
//         anchorX: 1234,
//         anchorY: 440,
//         floorname: "7",
//         area1: "12000 sqft",
//         area2: "36000 sqft",
//         unitplan: {
//             image_2d: floor7,
//             image_3d: floor7,
//             sideContent: [
//                 {
//                     id: 1,
//                     title: "Lift Lobby",
//                     polygons: [
//                         {
//                             id: "lift_1",
//                             polygon: "601,443,643,440,643,392,954,391,955,501,887,502,887,608,841,607,840,655,524,659,526,552,601,549",
//                         },
//                         {
//                             id: "lift_2",
//                             polygon: "404,152,458,140,471,207,418,219",
//                         }
//                     ]
//                 },
//                 {
//                     id: 2,
//                     title: "AHU Room",
//                     polygons: [
//                         {
//                             id: "ahu_1",
//                             polygon: "1111,421,1177,422,1178,511,1111,510",
//                         },
//                         {
//                             id: "ahu_2",
//                             polygon: "1111,540,1181,541,1178,628,1112,627",
//                         },
//                         {
//                             id: "ahu_3",
//                             polygon: "322,612,366,613,366,543,387,543,387,699,323,697",
//                         }
//                     ]
//                 },
//                 {
//                     id: 3,
//                     title: "Staircase",
//                     polygons: [
//                         {
//                             id: "stair_1",
//                             polygon: "530,447,598,448,598,549,529,548",
//                         },
//                         {
//                             id: "stair_2",
//                             polygon: "888,503,954,503,956,603,888,604",
//                         },
//                         {
//                             id: "stair_3",
//                             polygon: "461,142,564,122,577,185,473,207",
//                         }
//                     ]
//                 },
//                 {
//                     id: 4,
//                     title: "Gents Restroom",
//                     polygons: [
//                         {
//                             id: "gents_1",
//                             polygon: "996,388,1039,389,1039,413,1060,412,1060,438,1035,437,1038,518,1013,518,1010,502,968,503,967,463,996,460",
//                         },
//                         {
//                             id: "gents_2",
//                             polygon: "454,543,521,543,521,583,491,586,491,654,454,653",
//                         }
//                     ]
//                 },
//                 {
//                     id: 5,
//                     title: "Ladies Restroom",
//                     polygons: [
//                         {
//                             id: "ladies_1",
//                             polygon: "1010,523,1038,523,1036,593,996,594,994,623,979,624,979,599,964,598,963,557,1009,554",
//                         },
//                         {
//                             id: "ladies_2",
//                             polygon: "414,482,477,484,478,524,452,522,453,651,423,653,421,598,410,598,411,543",
//                         }
//                     ]
//                 },
//                 {
//                     id: 6,
//                     title: "Office Area",
//                     polygons: [
//                         {
//                             id: "ladies_1",
//                             polygon: "260,704,389,703,390,633,407,632,408,641,418,642,419,661,845,662,845,633,1181,631,1179,419,1142,418,1144,387,785,384,786,235,655,232,487,266,474,211,584,186,575,151,589,143,576,89,646,81,722,79,791,80,862,83,959,94,1043,111,1146,138,1275,182,1352,223,1402,262,1430,312,1447,351,1453,387,1451,446,1439,489,1420,527,1396,564,1331,631,1284,678,1211,745,1111,827,1028,881,960,924,883,954,799,970,728,974,643,962,557,939,440,877,271,738,244,718",
//                         },
//                     ]
//                 },
//                 {
//                     id: 7,
//                     title: "Refuge Area",
//                     polygons: [
//                         {
//                             id: "ladies_1",
//                             polygon: "390,124,397,149,372,158,391,246,474,232,483,272,656,240,783,240,781,388,638,392,638,422,524,422,526,440,513,441,513,464,522,464,522,493,483,495,483,481,410,481,411,465,424,462,424,441,410,439,411,421,387,419,386,510,408,511,408,539,364,539,366,610,319,611,319,699,258,700,243,721,127,604,66,528,39,472,31,421,36,375,49,333,69,287,100,250,141,218,233,177",
//                         },
//                     ]
//                 },
//             ]
//         }
//     },
//     {
//         id: 6,
//         name: "Floor 6",
//         area: "12,000 sqft",
//         points: "726,471,882,448,1080,445,1173,448,1246,454,1248,478,1087,473,931,475,842,480,725,492",
//         gradientId: "grad6",
//         anchorX: 1231,
//         anchorY: 470,
//         floorname: "6",
//         area1: "12000 sqft",
//         area2: "36000 sqft",
//         unitplan: {
//             image_2d: floor6,
//             image_3d: floor6,
//             sideContent: [
//                 {
//                     id: 1,
//                     title: "dummy",
//                     polygons: [
//                         {
//                             id: "dummy_1",
//                             polygon: "455,66,788,8999,"
//                         }
//                     ]
//                 }
//             ]
//         }
//     },
//     {
//         id: 5,
//         name: "Floor 5",
//         area: "12,000 sqft",
//         points: "726,494,887,476,1010,473,1139,475,1225,478,1246,482,1244,504,1108,499,964,499,847,503,726,517",
//         gradientId: "grad5",
//         anchorX: 1228,
//         anchorY: 490,
//         floorname: "5",
//         area1: "12000 sqft",
//         area2: "36000 sqft",
//         unitplan: {
//             image_2d: floor5,
//             image_3d: floor5,
//             sideContent: [
//                 {
//                     id: 1,
//                     title: "dummy",
//                     polygons: [
//                         {
//                             id: "dummy_1",
//                             polygon: "455,66,788,8999,"
//                         }
//                     ]
//                 }
//             ]
//         }
//     },
//     {
//         id: 4,
//         name: "Floor 4",
//         area: "12,000 sqft",
//         points: "728,519,875,503,1045,498,1122,501,1213,506,1246,508,1246,538,1026,531,929,534,800,540,728,547",
//         gradientId: "grad4",
//         anchorX: 1225,
//         anchorY: 520,
//         floorname: "4",
//         area1: "12000 sqft",
//         area2: "36000 sqft",
//         unitplan: {
//             image_2d: floor4,
//             image_3d: floor4,
//             sideContent: [
//                 {
//                     id: 1,
//                     title: "dummy",
//                     polygons: [
//                         {
//                             id: "dummy_1",
//                             polygon: "455,66,788,8999,"
//                         }
//                     ]
//                 }
//             ]
//         }
//     },
//     {
//         id: 3,
//         name: "Floor 3",
//         area: "12,000 sqft",
//         points: "730,547,847,536,971,532,1076,531,1173,534,1248,540,1248,568,996,562,847,566,726,576",
//         gradientId: "grad3",
//         anchorX: 1222,
//         anchorY: 555,
//         floorname: "3",
//         area1: "12000 sqft",
//         area2: "36000 sqft",
//         unitplan: {
//             image_2d: floor3,
//             image_3d: floor3,
//             sideContent: [
//                 {
//                     id: 1,
//                     title: "dummy",
//                     polygons: [
//                         {
//                             id: "dummy_1",
//                             polygon: "455,66,788,8999,"
//                         }
//                     ]
//                 }
//             ]
//         }
//     },
//     {
//         id: 2,
//         name: "Floor 2",
//         area: "12,000 sqft",
//         points: "726,578,884,562,968,560,1057,560,1141,564,1202,566,1248,569,1246,595,926,590,803,592,725,599",
//         gradientId: "grad3",
//         anchorX: 1222,
//         anchorY: 580,
//         floorname: "2",
//         area1: "12000 sqft",
//         area2: "36000 sqft",
//         unitplan: {
//             image_2d: floor2,
//             image_3d: floor2,
//             sideContent: [
//                 {
//                     id: 1,
//                     title: "dummy",
//                     polygons: [
//                         {
//                             id: "dummy_1",
//                             polygon: "455,66,788,8999,"
//                         }
//                     ]
//                 }
//             ]
//         }
//     },
//     {
//         id: 1,
//         name: "Floor 1",
//         area: "12,000 sqft",
//         points: "726,598,875,589,1047,589,1167,592,1244,596,1243,612,1111,605,900,606,793,610,725,617",
//         gradientId: "grad3",
//         anchorX: 1222,
//         anchorY: 600,
//         floorname: "1",
//         area1: "12000 sqft",
//         area2: "36000 sqft",
//         unitplan: {
//             image_2d: floor1,
//             image_3d: floor1,
//             sideContent: [
//                 {
//                     id: 1,
//                     title: "dummy",
//                     polygons: [
//                         {
//                             id: "dummy_1",
//                             polygon: "455,66,788,8999,"
//                         }
//                     ]
//                 }
//             ]
//         }
//     },
//     {
//         id: 0,
//         name: "Ground Floor",
//         area: "12,000 sqft",
//         points: "728,732,728,773,1248,771,1248,727",
//         gradientId: "grad3",
//         anchorX: 1222,
//         anchorY: 600,
//         floorname: "Ground",
//         area1: "12000 sqft",
//         area2: "36000 sqft",
//         unitplan: {
//             image_2d: floorGround,
//             image_3d: floorGround,
//             sideContent: [
//                 {
//                     id: 1,
//                     title: "Double Heighted Lobby",
//                     polygons: [
//                         {
//                             id: "double_heighted_lobby_1",
//                             polygon: "496,631,905,629,918,623,922,613,992,613,1045,615,1048,631,1087,629,1132,807,1063,860,526,865,526,665,498,661"
//                         }
//                     ]
//                 },
//                 {
//                     id: 2,
//                     title: "Lift Lobby",
//                     polygons: [
//                         {
//                             id: "lift_lobby_1",
//                             polygon: "617,423,758,421,758,624,618,625"
//                         },
//                         {
//                             id: "lift_lobby_2",
//                             polygon: "758,425,896,421,896,629,757,629"
//                         },
//                         {
//                             id: "lift_lobby_3",
//                             polygon: "989,448,1086,448,1087,611,990,612"
//                         }
//                     ]
//                 },
//                 {
//                     id: 3,
//                     title: "Entrance Lobby",
//                     polygons: [
//                         {
//                             id: "entrance_lobby_1",
//                             polygon: "525,864,1061,864,1007,901,958,925,878,953,812,966,745,969,655,958,585,937,528,910"
//                         }
//                     ]
//                 },
//                 {
//                     id: 4,
//                     title: "Kitchen",
//                     polygons: [
//                         {
//                             id: "kitchen_1",
//                             polygon: "1139,414,1247,413,1247,468,1240,498,1228,526,1205,556,1179,578,1153,594,1091,602,1089,490,1141,492"
//                         }
//                     ]
//                 },
//                 {
//                     id: 5,
//                     title: "Fine Dine Restaurant",
//                     polygons: [
//                         {
//                             id: "fine_dine_restaurant_1",
//                             polygon: "1249,468,1447,465,1440,490,1427,519,1410,545,1389,570,1359,606,1335,631,1306,659,1276,686,1263,701,1243,717,1212,741,1188,766,1157,789,1132,807,1098,670,1087,620,1104,623,1104,604,1133,600,1173,586,1211,554,1234,519"
//                         }
//                     ]
//                 },
//                 {
//                     id: 6,
//                     title: "Staircase",
//                     polygons: [
//                         {
//                             id: "staircase_1",
//                             polygon: "899,505,967,507,966,604,900,608"
//                         },
//                         {
//                             id: "staircase_2",
//                             polygon: "546,450,615,450,614,551,545,553"
//                         },
//                         {
//                             id: "staircase_3",
//                             polygon: "478,147,583,128,595,190,492,214"
//                         },
//                         {
//                             id: "staircase_4",
//                             polygon: "439,769,490,769,491,838,437,836"
//                         }
//                     ]
//                 },
//                 {
//                     id: 7,
//                     title: "Sub Station",
//                     polygons: [
//                         {
//                             id: "sub_station_1",
//                             polygon: "928,287,1250,287,1249,412,926,413"
//                         },
//                         {
//                             id: "sub_station_2",
//                             polygon: "591,144,604,138,601,126,672,115,748,118,752,136,761,135,762,284,601,283,601,189"
//                         }
//                     ]
//                 },
//                 {
//                     id: 8,
//                     title: "Wide Ramp",
//                     polygons: [
//                         {
//                             id: "wide_ramp_1",
//                             polygon: "292,738,292,473,300,431,314,399,336,368,360,347,393,325,437,309,589,308,591,421,470,421,446,423,427,435,411,454,403,477,402,511,403,741"
//                         },
//                         {
//                             id: "wide_ramp_2",
//                             polygon: "70,311,399,308,378,320,355,334,330,354,314,375,300,395,293,410,288,422,69,419"
//                         }
//                     ]
//                 },
//                 {
//                     id: 9,
//                     title: "Restroom",
//                     polygons: [
//                         {
//                             id: "restroom_1",
//                             polygon: "407,510,541,511,542,543,524,545,521,554,496,551,492,573,408,573"
//                         }
//                     ]
//                 }
//             ]
//         }
//     }
// ];



// import image1 from '../assets/../assets/Project_Details/animated.png';
// import image2 from '../assets/Project_info/ProjectInfoimage.png';

import floorGround from '../../assets/UnitPlan/2-d-floorplans/Ground_Floor.png';
import floor7 from '../../assets/UnitPlan/2-d-floorplans/7th_Floor_Refuge.png';
import floor8 from '../../assets/UnitPlan/2-d-floorplans/8_13&13_15_Typical.png';
import floor21 from '../../assets/UnitPlan/2-d-floorplans/21_Refuge.png';
import floor22 from '../../assets/UnitPlan/2-d-floorplans/22_25_Typical.png';
// import floor23 from '../assets/UnitPlan/2-d-floorplans/22_25_Typical.png';
// import floor24 from '../assets/UnitPlan/2-d-floorplans/22_25_Typical.png';
// import floor25 from '../assets/UnitPlan/2-d-floorplans/22_25_Typical.png';

export interface SideContentPolygon {
    id: string;
    polygon: string;
}

export interface SideContentItem {
    id: number;
    title: string;
    polygons: SideContentPolygon[];
    polygon?: string;
}

export interface FloorData {
    id: number;
    name: string;
    area: string;
    points: string;
    gradientId: string;
    /** Anchor point (in SVG-viewBox units) for the tooltip arrow tip */
    anchorX: number;
    anchorY: number;
    floorname: string;
    area1: string;
    area2: string;
    unitplan: {
        image_2d: string;
        image_3d: string;
        sideContent: SideContentItem[];
    };
}
export const VIEWBOX_W = 1982;
export const VIEWBOX_H = 1024;

export const floors: FloorData[] = [
    // {
    //     id: 25,
    //     name: "25",
    //     area: "12,000 sqft",
    //     points: "725,717,725,732,1089,729,1206,727,1248,731,1248,713,1092,710,938,715,795,715",
    //     gradientId: "grad10",
    //     anchorX: 1246,
    //     anchorY: 723,
    //     floorname: "Podium 1",
    //     area1: "68000 sqft",
    //     area2: "68000 sqft",
    //     unitplan: {
    //         image_2d: floor25,
    //         image_3d: floor25,
    //         sideContent: [
    //             {
    //                 id: 1,
    //                 title: "Lift Lobby",
    //                 polygons: [
    //                     {
    //                         id: "dummy_1",
    //                         polygon: "644,418,702,416,699,477,791,475,652,678,618,657,524,654,524,613,570,603,564,553,600,549,598,451,618,444,617,423"
    //                     },
    //                     {
    //                         id: "dummy_1",
    //                         polygon: "404,152,458,140,471,207,418,219"
    //                     },
    //                 ]
    //             },
    //             {
    //                 id: 2,
    //                 title: "AHU Room",
    //                 polygons: [
    //                     {
    //                         id: "dummy_1",
    //                         polygon: "583,115,625,106,638,172,595,178"
    //                     },
    //                     {
    //                         id: "dummy_1",
    //                         polygon: "323,419,386,418,387,505,323,506"
    //                     },
    //                 ]
    //             },
    //             {
    //                 id: 3,
    //                 title: "Staircase",
    //                 polygons: [
    //                     {
    //                         id: "dummy_1",
    //                         polygon: "530,447,598,448,598,549,529,548"
    //                     },
    //                     {
    //                         id: "dummy_1",
    //                         polygon: "461,142,564,122,577,185,473,207"
    //                     },
    //                 ]
    //             },
    //             {
    //                 id: 4,
    //                 title: "Gents Restroom",
    //                 polygons: [
    //                     {
    //                         id: "dummy_1",
    //                         polygon: "445,545,522,547,524,585,490,586,492,657,411,659,411,553,441,556"
    //                     },
    //                 ]
    //             },
    //             {
    //                 id: 5,
    //                 title: "Ladies Restroom",
    //                 polygons: [
    //                     {
    //                         id: "dummy_1",
    //                         polygon: "404,421,520,421,520,493,407,498"
    //                     },
    //                 ]
    //             },
    //             {
    //                 id: 6,
    //                 title: "Office Area",
    //                 polygons: [
    //                     {
    //                         id: "dummy_1",
    //                         polygon: "625,80,627,104,643,172,593,185,604,211,474,240,470,229,394,246,377,172,366,168,183,431,212,450,168,511,144,494,127,518,119,540,117,568,128,603,163,640,267,738,355,811,437,869,471,874,520,863,570,797,651,682,615,657,404,658,407,629,387,628,385,540,410,539,411,551,431,553,439,499,411,497,411,509,318,511,319,418,580,417,580,437,612,439,613,414,702,417,702,430,824,430,937,271,943,241,943,140,933,113,903,89,848,77,720,73"
    //                     },
    //                     {
    //                         id: "dummy_1",
    //                         polygon: "365,168,391,132,428,113,501,98,581,84,627,81,625,104,444,143,435,125,415,131,395,148,381,172"
    //                     },
    //                 ]
    //             },
    //         ]
    //     }
    // },
    // {
    //     id: 24,
    //     name: "24",
    //     area: "12,000 sqft",
    //     points: "726,701,726,717,949,713,1090,713,1246,713,1246,699",
    //     gradientId: "grad10",
    //     anchorX: 1246,
    //     anchorY: 708,
    //     floorname: "Podium 2",
    //     area1: "68000 sqft",
    //     area2: "68000 sqft",
    //     unitplan: {
    //         image_2d: floor24,
    //         image_3d: floor24,
    //         sideContent: [
    //             {
    //                 id: 1,
    //                 title: "Lift Lobby",
    //                 polygons: [
    //                     {
    //                         id: "dummy_1",
    //                         polygon: "644,418,702,416,699,477,791,475,652,678,618,657,524,654,524,613,570,603,564,553,600,549,598,451,618,444,617,423"
    //                     },
    //                     {
    //                         id: "dummy_1",
    //                         polygon: "404,152,458,140,471,207,418,219"
    //                     },
    //                 ]
    //             },
    //             {
    //                 id: 2,
    //                 title: "AHU Room",
    //                 polygons: [
    //                     {
    //                         id: "dummy_1",
    //                         polygon: "583,115,625,106,638,172,595,178"
    //                     },
    //                     {
    //                         id: "dummy_1",
    //                         polygon: "323,419,386,418,387,505,323,506"
    //                     },
    //                 ]
    //             },
    //             {
    //                 id: 3,
    //                 title: "Staircase",
    //                 polygons: [
    //                     {
    //                         id: "dummy_1",
    //                         polygon: "530,447,598,448,598,549,529,548"
    //                     },
    //                     {
    //                         id: "dummy_1",
    //                         polygon: "461,142,564,122,577,185,473,207"
    //                     },
    //                 ]
    //             },
    //             {
    //                 id: 4,
    //                 title: "Gents Restroom",
    //                 polygons: [
    //                     {
    //                         id: "dummy_1",
    //                         polygon: "445,545,522,547,524,585,490,586,492,657,411,659,411,553,441,556"
    //                     },
    //                 ]
    //             },
    //             {
    //                 id: 5,
    //                 title: "Ladies Restroom",
    //                 polygons: [
    //                     {
    //                         id: "dummy_1",
    //                         polygon: "404,421,520,421,520,493,407,498"
    //                     },
    //                 ]
    //             },
    //             {
    //                 id: 6,
    //                 title: "Office Area",
    //                 polygons: [
    //                     {
    //                         id: "dummy_1",
    //                         polygon: "625,80,627,104,643,172,593,185,604,211,474,240,470,229,394,246,377,172,366,168,183,431,212,450,168,511,144,494,127,518,119,540,117,568,128,603,163,640,267,738,355,811,437,869,471,874,520,863,570,797,651,682,615,657,404,658,407,629,387,628,385,540,410,539,411,551,431,553,439,499,411,497,411,509,318,511,319,418,580,417,580,437,612,439,613,414,702,417,702,430,824,430,937,271,943,241,943,140,933,113,903,89,848,77,720,73"
    //                     },
    //                     {
    //                         id: "dummy_1",
    //                         polygon: "365,168,391,132,428,113,501,98,581,84,627,81,625,104,444,143,435,125,415,131,395,148,381,172"
    //                     },
    //                 ]
    //             },
    //         ]
    //     }
    // },
    // {
    //     id: 23,
    //     name: "23",
    //     area: "12,000 sqft",
    //     points: "726,689,725,702,847,698,992,698,1111,698,1248,700,1248,684,1092,684,963,684,789,686",
    //     gradientId: "grad10",
    //     anchorX: 1246,
    //     anchorY: 694,
    //     floorname: "Podium 3",
    //     area1: "68000 sqft",
    //     area2: "68000 sqft",
    //     unitplan: {
    //         image_2d: floor23,
    //         image_3d: floor23,
    //         sideContent: [
    //             {
    //                 id: 1,
    //                 title: "Lift Lobby",
    //                 polygons: [
    //                     {
    //                         id: "dummy_1",
    //                         polygon: "644,418,702,416,699,477,791,475,652,678,618,657,524,654,524,613,570,603,564,553,600,549,598,451,618,444,617,423"
    //                     },
    //                     {
    //                         id: "dummy_1",
    //                         polygon: "404,152,458,140,471,207,418,219"
    //                     },
    //                 ]
    //             },
    //             {
    //                 id: 2,
    //                 title: "AHU Room",
    //                 polygons: [
    //                     {
    //                         id: "dummy_1",
    //                         polygon: "583,115,625,106,638,172,595,178"
    //                     },
    //                     {
    //                         id: "dummy_1",
    //                         polygon: "323,419,386,418,387,505,323,506"
    //                     },
    //                 ]
    //             },
    //             {
    //                 id: 3,
    //                 title: "Staircase",
    //                 polygons: [
    //                     {
    //                         id: "dummy_1",
    //                         polygon: "530,447,598,448,598,549,529,548"
    //                     },
    //                     {
    //                         id: "dummy_1",
    //                         polygon: "461,142,564,122,577,185,473,207"
    //                     },
    //                 ]
    //             },
    //             {
    //                 id: 4,
    //                 title: "Gents Restroom",
    //                 polygons: [
    //                     {
    //                         id: "dummy_1",
    //                         polygon: "445,545,522,547,524,585,490,586,492,657,411,659,411,553,441,556"
    //                     },
    //                 ]
    //             },
    //             {
    //                 id: 5,
    //                 title: "Ladies Restroom",
    //                 polygons: [
    //                     {
    //                         id: "dummy_1",
    //                         polygon: "404,421,520,421,520,493,407,498"
    //                     },
    //                 ]
    //             },
    //             {
    //                 id: 6,
    //                 title: "Office Area",
    //                 polygons: [
    //                     {
    //                         id: "dummy_1",
    //                         polygon: "625,80,627,104,643,172,593,185,604,211,474,240,470,229,394,246,377,172,366,168,183,431,212,450,168,511,144,494,127,518,119,540,117,568,128,603,163,640,267,738,355,811,437,869,471,874,520,863,570,797,651,682,615,657,404,658,407,629,387,628,385,540,410,539,411,551,431,553,439,499,411,497,411,509,318,511,319,418,580,417,580,437,612,439,613,414,702,417,702,430,824,430,937,271,943,241,943,140,933,113,903,89,848,77,720,73"
    //                     },
    //                     {
    //                         id: "dummy_1",
    //                         polygon: "365,168,391,132,428,113,501,98,581,84,627,81,625,104,444,143,435,125,415,131,395,148,381,172"
    //                     },
    //                 ]
    //             },
    //         ]
    //     }
    // },
    // {
    //     id: 22,
    //     name: "22",
    //     area: "12,000 sqft",
    //     points: "730,675,726,689,933,687,1153,684,1246,684,1246,670,1054,672,873,672",
    //     gradientId: "grad10",
    //     anchorX: 1246,
    //     anchorY: 680,
    //     floorname: "Podium 4",
    //     area1: "68000 sqft",
    //     area2: "68000 sqft",
    //     unitplan: {
    //         image_2d: floor22,
    //         image_3d: floor22,
    // sideContent: [
    //     {
    //         id: 1,
    //         title: "Lift Lobby",
    //         polygons: [
    //             {
    //                 id: "dummy_1",
    //                 polygon: "644,418,702,416,699,477,791,475,652,678,618,657,524,654,524,613,570,603,564,553,600,549,598,451,618,444,617,423"
    //             },
    //             {
    //                 id: "dummy_1",
    //                 polygon: "404,152,458,140,471,207,418,219"
    //             },
    //         ]
    //     },
    //     {
    //         id: 2,
    //         title: "AHU Room",
    //         polygons: [
    //             {
    //                 id: "dummy_1",
    //                 polygon: "583,115,625,106,638,172,595,178"
    //             },
    //             {
    //                 id: "dummy_1",
    //                 polygon: "323,419,386,418,387,505,323,506"
    //             },
    //         ]
    //     },
    //     {
    //         id: 3,
    //         title: "Staircase",
    //         polygons: [
    //             {
    //                 id: "dummy_1",
    //                 polygon: "530,447,598,448,598,549,529,548"
    //             },
    //             {
    //                 id: "dummy_1",
    //                 polygon: "461,142,564,122,577,185,473,207"
    //             },
    //         ]
    //     },
    //     {
    //         id: 4,
    //         title: "Gents Restroom",
    //         polygons: [
    //             {
    //                 id: "dummy_1",
    //                 polygon: "445,545,522,547,524,585,490,586,492,657,411,659,411,553,441,556"
    //             },
    //         ]
    //     },
    //     {
    //         id: 5,
    //         title: "Ladies Restroom",
    //         polygons: [
    //             {
    //                 id: "dummy_1",
    //                 polygon: "404,421,520,421,520,493,407,498"
    //             },
    //         ]
    //     },
    //     {
    //         id: 6,
    //         title: "Office Area",
    //         polygons: [
    //             {
    //                 id: "dummy_1",
    //                 polygon: "625,80,627,104,643,172,593,185,604,211,474,240,470,229,394,246,377,172,366,168,183,431,212,450,168,511,144,494,127,518,119,540,117,568,128,603,163,640,267,738,355,811,437,869,471,874,520,863,570,797,651,682,615,657,404,658,407,629,387,628,385,540,410,539,411,551,431,553,439,499,411,497,411,509,318,511,319,418,580,417,580,437,612,439,613,414,702,417,702,430,824,430,937,271,943,241,943,140,933,113,903,89,848,77,720,73"
    //             },
    //             {
    //                 id: "dummy_1",
    //                 polygon: "365,168,391,132,428,113,501,98,581,84,627,81,625,104,444,143,435,125,415,131,395,148,381,172"
    //             },
    //         ]
    //     },
    // ]
    //     }
    // },
    // {
    //     id: 21,
    //     name: "21",
    //     area: "12,000 sqft",
    //     points: "726,659,728,675,1248,671,1248,652,1003,652,833,654",
    //     gradientId: "grad10",
    //     anchorX: 1246,
    //     anchorY: 662,
    //     floorname: "Podium 5",
    //     area1: "68000 sqft",
    //     area2: "36000 sqft",
    //     unitplan: {
    //         image_2d: floor21,
    //         image_3d: floor21,
    // sideContent: [
    //     {
    //         id: 1,
    //         title: "Lift Lobby",
    //         polygons: [
    //             {
    //                 id: "dummy_1",
    //                 polygon: "644,418,702,416,699,477,791,475,652,678,618,657,524,654,524,613,570,603,564,553,600,549,598,451,618,444,617,423"
    //             },
    //             {
    //                 id: "dummy_1",
    //                 polygon: "404,152,458,140,471,207,418,219"
    //             },
    //         ]
    //     },
    //     {
    //         id: 2,
    //         title: "AHU Room",
    //         polygons: [
    //             {
    //                 id: "dummy_1",
    //                 polygon: "583,115,625,106,638,172,595,178"
    //             },
    //             {
    //                 id: "dummy_1",
    //                 polygon: "323,419,386,418,387,505,323,506"
    //             },
    //         ]
    //     },
    //     {
    //         id: 3,
    //         title: "Staircase",
    //         polygons: [
    //             {
    //                 id: "dummy_1",
    //                 polygon: "530,447,598,448,598,549,529,548"
    //             },
    //             {
    //                 id: "dummy_1",
    //                 polygon: "461,142,564,122,577,185,473,207"
    //             },
    //         ]
    //     },
    //     {
    //         id: 4,
    //         title: "Gents Restroom",
    //         polygons: [
    //             {
    //                 id: "dummy_1",
    //                 polygon: "445,545,522,547,524,585,490,586,492,657,411,659,411,553,441,556"
    //             },
    //         ]
    //     },
    //     {
    //         id: 5,
    //         title: "Ladies Restroom",
    //         polygons: [
    //             {
    //                 id: "dummy_1",
    //                 polygon: "404,421,520,421,520,493,407,498"
    //             },
    //         ]
    //     },
    //     {
    //         id: 6,
    //         title: "Office Area",
    //         polygons: [
    //             {
    //                 id: "dummy_1",
    //                 polygon: "435,123,543,104,634,92,774,88,858,93,891,98,916,110,930,135,930,246,924,265,810,430,703,431,701,385,643,385,640,227,516,253,511,233,536,224,529,199,639,170,625,104,439,140"
    //             },
    //             {
    //                 id: "dummy_1",
    //                 polygon: "525,387,526,417,343,418,343,509,408,509,408,537,383,539,386,631,406,631,406,661,618,661,635,675,532,828,512,846,486,859,457,861,432,852,403,832,347,788,272,729,192,650,142,608,127,570,128,536,146,510,302,505,303,389"
    //             },
    //         ]
    //     },
    //     {
    //         id: 7,
    //         title: "Refuge Area",
    //         polygons: [
    //             {
    //                 id: "dummy_1",
    //                 polygon: "376,172,390,249,474,229,480,263,640,229,639,387,298,387,300,506,146,509"
    //             },
    //         ]
    //     },
    // ]
    //     }
    // },
    // {
    //     id: 20,
    //     name: "20",
    //     area: "12,000 sqft",
    //     points: "728,642,847,635,982,635,1145,635,1216,637,1248,639,1248,653,998,651,844,653,767,656,730,660",
    //     gradientId: "grad10",
    //     anchorX: 1246,
    //     anchorY: 650,
    //     floorname: "Podium 6",
    //     area1: "68000 sqft",
    //     area2: "68000 sqft",
    //     unitplan: {
    //         image_2d: floor8,
    //         image_3d: floor8,
    //         sideContent: [
    //             {
    //                 id: 1,
    //                 title: "Lift Lobby",
    //                 polygons: [
    //                     {
    //                         id: "dummy_1",
    //                         polygon: "601,443,643,440,643,392,954,391,955,501,887,502,887,608,841,607,840,655,524,659,526,552,601,549"
    //                     },
    //                     {
    //                         id: "dummy_1",
    //                         polygon: "404,152,458,140,471,207,418,219"
    //                     }
    //                 ]
    //             },
    //             {
    //                 id: 2,
    //                 title: "AHU Room",
    //                 polygons: [
    //                     {
    //                         id: "dummy_1",
    //                         polygon: "318,423,383,423,382,509,319,509"
    //                     },
    //                     {
    //                         id: "dummy_1",
    //                         polygon: "317,543,382,543,381,627,317,629"
    //                     },
    //                     {
    //                         id: "dummy_1",
    //                         polygon: "1114,422,1179,423,1178,506,1114,509"
    //                     },
    //                     {
    //                         id: "dummy_1",
    //                         polygon: "1114,543,1178,541,1178,628,1114,627"
    //                     }
    //                 ]
    //             }, {
    //                 id: 3,
    //                 title: "Staircase",
    //                 polygons: [
    //                     {
    //                         id: "dummy_1",
    //                         polygon: "530,447,598,448,598,549,529,548"
    //                     },
    //                     {
    //                         id: "dummy_1",
    //                         polygon: "888,503,954,503,956,603,888,604,"
    //                     },
    //                     {
    //                         id: "dummy_1",
    //                         polygon: "461,142,564,122,577,185,473,207"
    //                     },
    //                 ]
    //             },
    //             {
    //                 id: 4,
    //                 title: "Gents Restroom",
    //                 polygons: [
    //                     {
    //                         id: "dummy_1",
    //                         polygon: "997,395,1089,395,1090,434,1073,439,1072,461,1089,465,1090,505,966,505,967,464,997,457"
    //                     },
    //                     {
    //                         id: "dummy_1",
    //                         polygon: "406,556,433,556,433,572,441,573,441,551,517,548,516,589,487,590,487,659,406,659"
    //                     },
    //                 ]
    //             },
    //             {
    //                 id: 5,
    //                 title: "Ladies Restroom",
    //                 polygons: [
    //                     {
    //                         id: "dummy_1",
    //                         polygon: "963,557,1068,558,1068,545,1089,547,1094,625,963,627"
    //                     },
    //                     {
    //                         id: "dummy_1",
    //                         polygon: "404,421,520,421,520,493,407,498"
    //                     },
    //                 ]
    //             },
    //             {
    //                 id: 6,
    //                 title: "Office Area",
    //                 polygons: [
    //                     {
    //                         id: "dummy_1",
    //                         polygon: "585,84,588,127,565,136,576,188,521,201,526,226,470,245,464,231,383,250,363,155,388,148,378,124,206,183,129,220,80,262,41,322,25,381,24,440,36,499,66,550,129,623,196,686,261,747,346,815,467,899,557,947,564,663,483,665,403,665,404,631,314,629,315,416,638,419,640,391,631,83"
    //                     },
    //                     {
    //                         id: "dummy_1",
    //                         polygon: "631,81,747,77,866,81,1014,102,1114,127,1270,180,1357,220,1406,266,1444,334,1457,393,1449,471,1428,526,1363,607,1287,682,1128,819,1007,903,924,941,836,971,736,981,640,970,559,946,563,663,656,662,846,662,845,632,1184,627,1183,418,1093,421,1093,387,640,388"
    //                     },
    //                 ]
    //             },
    //         ]
    //     }
    // },
    {
        id: 25,
        name: "25",
        area: "12,000 sqft",
        points: "725,111,746,78,791,80,928,106,1066,132,1094,152,1071,153,900,127,767,110,723,125",
        gradientId: "grad10",
        anchorX: 1116,
        anchorY: 140,
        floorname: "25",
        area1: "12000 sqft",
        area2: "12000 sqft",
        unitplan: {
            image_2d: floor22,
            image_3d: floor22,
            sideContent: [
                {
                    id: 1,
                    title: "Lift Lobby",
                    polygons: [
                        {
                            id: "dummy_1",
                            polygon: "644,418,702,416,699,477,791,475,652,678,618,657,524,654,524,613,570,603,564,553,600,549,598,451,618,444,617,423"
                        },
                        {
                            id: "dummy_1",
                            polygon: "404,152,458,140,471,207,418,219"
                        },
                    ]
                },
                {
                    id: 2,
                    title: "AHU Room",
                    polygons: [
                        {
                            id: "dummy_1",
                            polygon: "583,115,625,106,638,172,595,178"
                        },
                        {
                            id: "dummy_1",
                            polygon: "323,419,386,418,387,505,323,506"
                        },
                    ]
                },
                {
                    id: 3,
                    title: "Staircase",
                    polygons: [
                        {
                            id: "dummy_1",
                            polygon: "530,447,598,448,598,549,529,548"
                        },
                        {
                            id: "dummy_1",
                            polygon: "461,142,564,122,577,185,473,207"
                        },
                    ]
                },
                {
                    id: 4,
                    title: "Gents Restroom",
                    polygons: [
                        {
                            id: "dummy_1",
                            polygon: "445,545,522,547,524,585,490,586,492,657,411,659,411,553,441,556"
                        },
                    ]
                },
                {
                    id: 5,
                    title: "Ladies Restroom",
                    polygons: [
                        {
                            id: "dummy_1",
                            polygon: "404,421,520,421,520,493,407,498"
                        },
                    ]
                },
                {
                    id: 6,
                    title: "Office Area",
                    polygons: [
                        {
                            id: "dummy_1",
                            polygon: "625,80,627,104,643,172,593,185,604,211,474,240,470,229,394,246,377,172,366,168,183,431,212,450,168,511,144,494,127,518,119,540,117,568,128,603,163,640,267,738,355,811,437,869,471,874,520,863,570,797,651,682,615,657,404,658,407,629,387,628,385,540,410,539,411,551,431,553,439,499,411,497,411,509,318,511,319,418,580,417,580,437,612,439,613,414,702,417,702,430,824,430,937,271,943,241,943,140,933,113,903,89,848,77,720,73"
                        },
                        {
                            id: "dummy_1",
                            polygon: "365,168,391,132,428,113,501,98,581,84,627,81,625,104,444,143,435,125,415,131,395,148,381,172"
                        },
                    ]
                },
            ]
        }
    },
    {
        id: 24,
        name: "24",
        area: "12,000 sqft",
        points: "726,124,768,110,901,131,1089,155,1085,164,1033,164,749,131,726,138",
        gradientId: "grad10",
        anchorX: 1100,
        anchorY: 155,
        floorname: "24",
        area1: "12000 sqft",
        area2: "36000 sqft",
        unitplan: {
            image_2d: floor22,
            image_3d: floor22,
            sideContent: [
                {
                    id: 1,
                    title: "Lift Lobby",
                    polygons: [
                        {
                            id: "dummy_1",
                            polygon: "644,418,702,416,699,477,791,475,652,678,618,657,524,654,524,613,570,603,564,553,600,549,598,451,618,444,617,423"
                        },
                        {
                            id: "dummy_1",
                            polygon: "404,152,458,140,471,207,418,219"
                        },
                    ]
                },
                {
                    id: 2,
                    title: "AHU Room",
                    polygons: [
                        {
                            id: "dummy_1",
                            polygon: "583,115,625,106,638,172,595,178"
                        },
                        {
                            id: "dummy_1",
                            polygon: "323,419,386,418,387,505,323,506"
                        },
                    ]
                },
                {
                    id: 3,
                    title: "Staircase",
                    polygons: [
                        {
                            id: "dummy_1",
                            polygon: "530,447,598,448,598,549,529,548"
                        },
                        {
                            id: "dummy_1",
                            polygon: "461,142,564,122,577,185,473,207"
                        },
                    ]
                },
                {
                    id: 4,
                    title: "Gents Restroom",
                    polygons: [
                        {
                            id: "dummy_1",
                            polygon: "445,545,522,547,524,585,490,586,492,657,411,659,411,553,441,556"
                        },
                    ]
                },
                {
                    id: 5,
                    title: "Ladies Restroom",
                    polygons: [
                        {
                            id: "dummy_1",
                            polygon: "404,421,520,421,520,493,407,498"
                        },
                    ]
                },
                {
                    id: 6,
                    title: "Office Area",
                    polygons: [
                        {
                            id: "dummy_1",
                            polygon: "625,80,627,104,643,172,593,185,604,211,474,240,470,229,394,246,377,172,366,168,183,431,212,450,168,511,144,494,127,518,119,540,117,568,128,603,163,640,267,738,355,811,437,869,471,874,520,863,570,797,651,682,615,657,404,658,407,629,387,628,385,540,410,539,411,551,431,553,439,499,411,497,411,509,318,511,319,418,580,417,580,437,612,439,613,414,702,417,702,430,824,430,937,271,943,241,943,140,933,113,903,89,848,77,720,73"
                        },
                        {
                            id: "dummy_1",
                            polygon: "365,168,391,132,428,113,501,98,581,84,627,81,625,104,444,143,435,125,415,131,395,148,381,172"
                        },
                    ]
                },
            ]
        }
    },
    {
        id: 23,
        name: "23",
        area: "12,000 sqft",
        points: "726,139,753,129,805,136,910,148,987,160,961,164,912,167,861,167,767,153,728,160",
        gradientId: "grad10",
        anchorX: 975,
        anchorY: 155,
        floorname: "23",
        area1: "12000 sqft",
        area2: "68000 sqft",
        unitplan: {
            image_2d: floor22,
            image_3d: floor22,
            sideContent: [
                {
                    id: 1,
                    title: "Lift Lobby",
                    polygons: [
                        {
                            id: "dummy_1",
                            polygon: "644,418,702,416,699,477,791,475,652,678,618,657,524,654,524,613,570,603,564,553,600,549,598,451,618,444,617,423"
                        },
                        {
                            id: "dummy_1",
                            polygon: "404,152,458,140,471,207,418,219"
                        },
                    ]
                },
                {
                    id: 2,
                    title: "AHU Room",
                    polygons: [
                        {
                            id: "dummy_1",
                            polygon: "583,115,625,106,638,172,595,178"
                        },
                        {
                            id: "dummy_1",
                            polygon: "323,419,386,418,387,505,323,506"
                        },
                    ]
                },
                {
                    id: 3,
                    title: "Staircase",
                    polygons: [
                        {
                            id: "dummy_1",
                            polygon: "530,447,598,448,598,549,529,548"
                        },
                        {
                            id: "dummy_1",
                            polygon: "461,142,564,122,577,185,473,207"
                        },
                    ]
                },
                {
                    id: 4,
                    title: "Gents Restroom",
                    polygons: [
                        {
                            id: "dummy_1",
                            polygon: "445,545,522,547,524,585,490,586,492,657,411,659,411,553,441,556"
                        },
                    ]
                },
                {
                    id: 5,
                    title: "Ladies Restroom",
                    polygons: [
                        {
                            id: "dummy_1",
                            polygon: "404,421,520,421,520,493,407,498"
                        },
                    ]
                },
                {
                    id: 6,
                    title: "Office Area",
                    polygons: [
                        {
                            id: "dummy_1",
                            polygon: "625,80,627,104,643,172,593,185,604,211,474,240,470,229,394,246,377,172,366,168,183,431,212,450,168,511,144,494,127,518,119,540,117,568,128,603,163,640,267,738,355,811,437,869,471,874,520,863,570,797,651,682,615,657,404,658,407,629,387,628,385,540,410,539,411,551,431,553,439,499,411,497,411,509,318,511,319,418,580,417,580,437,612,439,613,414,702,417,702,430,824,430,937,271,943,241,943,140,933,113,903,89,848,77,720,73"
                        },
                        {
                            id: "dummy_1",
                            polygon: "365,168,391,132,428,113,501,98,581,84,627,81,625,104,444,143,435,125,415,131,395,148,381,172"
                        },
                    ]
                },
            ]
        }
    },
    {
        id: 22,
        name: "22",
        area: "12,000 sqft",
        points: "730,162,753,153,768,153,863,167,842,174,796,186,754,179,730,195",
        gradientId: "grad10",
        anchorX: 886,
        anchorY: 160,
        floorname: "22",
        area1: "12000 sqft",
        area2: "68000 sqft",
        unitplan: {
            image_2d: floor22,
            image_3d: floor22,
            sideContent: [
                {
                    id: 1,
                    title: "Lift Lobby",
                    polygons: [
                        {
                            id: "dummy_1",
                            polygon: "644,418,702,416,699,477,791,475,652,678,618,657,524,654,524,613,570,603,564,553,600,549,598,451,618,444,617,423"
                        },
                        {
                            id: "dummy_1",
                            polygon: "404,152,458,140,471,207,418,219"
                        },
                    ]
                },
                {
                    id: 2,
                    title: "AHU Room",
                    polygons: [
                        {
                            id: "dummy_1",
                            polygon: "583,115,625,106,638,172,595,178"
                        },
                        {
                            id: "dummy_1",
                            polygon: "323,419,386,418,387,505,323,506"
                        },
                    ]
                },
                {
                    id: 3,
                    title: "Staircase",
                    polygons: [
                        {
                            id: "dummy_1",
                            polygon: "530,447,598,448,598,549,529,548"
                        },
                        {
                            id: "dummy_1",
                            polygon: "461,142,564,122,577,185,473,207"
                        },
                    ]
                },
                {
                    id: 4,
                    title: "Gents Restroom",
                    polygons: [
                        {
                            id: "dummy_1",
                            polygon: "445,545,522,547,524,585,490,586,492,657,411,659,411,553,441,556"
                        },
                    ]
                },
                {
                    id: 5,
                    title: "Ladies Restroom",
                    polygons: [
                        {
                            id: "dummy_1",
                            polygon: "404,421,520,421,520,493,407,498"
                        },
                    ]
                },
                {
                    id: 6,
                    title: "Office Area",
                    polygons: [
                        {
                            id: "dummy_1",
                            polygon: "625,80,627,104,643,172,593,185,604,211,474,240,470,229,394,246,377,172,366,168,183,431,212,450,168,511,144,494,127,518,119,540,117,568,128,603,163,640,267,738,355,811,437,869,471,874,520,863,570,797,651,682,615,657,404,658,407,629,387,628,385,540,410,539,411,551,431,553,439,499,411,497,411,509,318,511,319,418,580,417,580,437,612,439,613,414,702,417,702,430,824,430,937,271,943,241,943,140,933,113,903,89,848,77,720,73"
                        },
                        {
                            id: "dummy_1",
                            polygon: "365,168,391,132,428,113,501,98,581,84,627,81,625,104,444,143,435,125,415,131,395,148,381,172"
                        },
                    ]
                },
            ]
        }
    },
    {
        id: 21,
        name: "21",
        area: "12,000 sqft",
        points: "725,197,754,181,798,185,777,199,739,223,725,242",
        gradientId: "grad10",
        anchorX: 846,
        anchorY: 180,
        floorname: "21",
        area1: "12000 sqft",
        area2: "68000 sqft",
        unitplan: {
            image_2d: floor21,
            image_3d: floor21,
            sideContent: [
                {
                    id: 1,
                    title: "Lift Lobby",
                    polygons: [
                        {
                            id: "dummy_1",
                            polygon: "644,418,702,416,699,477,791,475,652,678,618,657,524,654,524,613,570,603,564,553,600,549,598,451,618,444,617,423"
                        },
                        {
                            id: "dummy_1",
                            polygon: "404,152,458,140,471,207,418,219"
                        },
                    ]
                },
                {
                    id: 2,
                    title: "AHU Room",
                    polygons: [
                        {
                            id: "dummy_1",
                            polygon: "583,115,625,106,638,172,595,178"
                        },
                        {
                            id: "dummy_1",
                            polygon: "323,419,386,418,387,505,323,506"
                        },
                    ]
                },
                {
                    id: 3,
                    title: "Staircase",
                    polygons: [
                        {
                            id: "dummy_1",
                            polygon: "530,447,598,448,598,549,529,548"
                        },
                        {
                            id: "dummy_1",
                            polygon: "461,142,564,122,577,185,473,207"
                        },
                    ]
                },
                {
                    id: 4,
                    title: "Gents Restroom",
                    polygons: [
                        {
                            id: "dummy_1",
                            polygon: "445,545,522,547,524,585,490,586,492,657,411,659,411,553,441,556"
                        },
                    ]
                },
                {
                    id: 5,
                    title: "Ladies Restroom",
                    polygons: [
                        {
                            id: "dummy_1",
                            polygon: "404,421,520,421,520,493,407,498"
                        },
                    ]
                },
                {
                    id: 6,
                    title: "Office Area",
                    polygons: [
                        {
                            id: "dummy_1",
                            polygon: "435,123,543,104,634,92,774,88,858,93,891,98,916,110,930,135,930,246,924,265,810,430,703,431,701,385,643,385,640,227,516,253,511,233,536,224,529,199,639,170,625,104,439,140"
                        },
                        {
                            id: "dummy_1",
                            polygon: "525,387,526,417,343,418,343,509,408,509,408,537,383,539,386,631,406,631,406,661,618,661,635,675,532,828,512,846,486,859,457,861,432,852,403,832,347,788,272,729,192,650,142,608,127,570,128,536,146,510,302,505,303,389"
                        },
                    ]
                },
                {
                    id: 7,
                    title: "Refuge Area",
                    polygons: [
                        {
                            id: "dummy_1",
                            polygon: "376,172,390,249,474,229,480,263,640,229,639,387,298,387,300,506,146,509"
                        },
                    ]
                },
            ]
        }
    },
    {
        id: 20,
        name: "20",
        area: "68,000 sqft",
        points: "723,279,747,244,788,211,859,192,977,183,1094,185,1192,194,1222,201,1246,220,1248,241,1160,226,1029,219,898,223,809,240,726,302",
        gradientId: "grad10",
        anchorX: 1246,
        anchorY: 225,
        floorname: "20",
        area1: "68000 sqft",
        area2: "36000 sqft",
        unitplan: {
            image_2d: floor8,
            image_3d: floor8,
            sideContent: [
                {
                    id: 1,
                    title: "Lift Lobby",
                    polygons: [
                        {
                            id: "dummy_1",
                            polygon: "601,443,643,440,643,392,954,391,955,501,887,502,887,608,841,607,840,655,524,659,526,552,601,549"
                        },
                        {
                            id: "dummy_1",
                            polygon: "404,152,458,140,471,207,418,219"
                        }
                    ]
                },
                {
                    id: 2,
                    title: "AHU Room",
                    polygons: [
                        {
                            id: "dummy_1",
                            polygon: "318,423,383,423,382,509,319,509"
                        },
                        {
                            id: "dummy_1",
                            polygon: "317,543,382,543,381,627,317,629"
                        },
                        {
                            id: "dummy_1",
                            polygon: "1114,422,1179,423,1178,506,1114,509"
                        },
                        {
                            id: "dummy_1",
                            polygon: "1114,543,1178,541,1178,628,1114,627"
                        }
                    ]
                }, {
                    id: 3,
                    title: "Staircase",
                    polygons: [
                        {
                            id: "dummy_1",
                            polygon: "530,447,598,448,598,549,529,548"
                        },
                        {
                            id: "dummy_1",
                            polygon: "888,503,954,503,956,603,888,604,"
                        },
                        {
                            id: "dummy_1",
                            polygon: "461,142,564,122,577,185,473,207"
                        },
                    ]
                },
                {
                    id: 4,
                    title: "Gents Restroom",
                    polygons: [
                        {
                            id: "dummy_1",
                            polygon: "997,395,1089,395,1090,434,1073,439,1072,461,1089,465,1090,505,966,505,967,464,997,457"
                        },
                        {
                            id: "dummy_1",
                            polygon: "406,556,433,556,433,572,441,573,441,551,517,548,516,589,487,590,487,659,406,659"
                        },
                    ]
                },
                {
                    id: 5,
                    title: "Ladies Restroom",
                    polygons: [
                        {
                            id: "dummy_1",
                            polygon: "963,557,1068,558,1068,545,1089,547,1094,625,963,627"
                        },
                        {
                            id: "dummy_1",
                            polygon: "404,421,520,421,520,493,407,498"
                        },
                    ]
                },
                {
                    id: 6,
                    title: "Office Area",
                    polygons: [
                        {
                            id: "dummy_1",
                            polygon: "585,84,588,127,565,136,576,188,521,201,526,226,470,245,464,231,383,250,363,155,388,148,378,124,206,183,129,220,80,262,41,322,25,381,24,440,36,499,66,550,129,623,196,686,261,747,346,815,467,899,557,947,564,663,483,665,403,665,404,631,314,629,315,416,638,419,640,391,631,83"
                        },
                        {
                            id: "dummy_1",
                            polygon: "631,81,747,77,866,81,1014,102,1114,127,1270,180,1357,220,1406,266,1444,334,1457,393,1449,471,1428,526,1363,607,1287,682,1128,819,1007,903,924,941,836,971,736,981,640,970,559,946,563,663,656,662,846,662,845,632,1184,627,1183,418,1093,421,1093,387,640,388"
                        },
                    ]
                },
            ]
        }
    },
    {
        id: 19,
        name: "19",
        area: "68,000 sqft",
        points: "726,304,767,267,809,239,870,228,949,219,1033,219,1117,223,1173,228,1225,237,1246,239,1246,267,1118,258,985,260,858,276,779,297,728,320",
        gradientId: "grad10",
        anchorX: 1246,
        anchorY: 250,
        floorname: "19",
        area1: "68000 sqft",
        area2: "68000 sqft",
        unitplan: {
            image_2d: floor8,
            image_3d: floor8,
            sideContent: [
                {
                    id: 1,
                    title: "Lift Lobby",
                    polygons: [
                        {
                            id: "dummy_1",
                            polygon: "601,443,643,440,643,392,954,391,955,501,887,502,887,608,841,607,840,655,524,659,526,552,601,549"
                        },
                        {
                            id: "dummy_1",
                            polygon: "404,152,458,140,471,207,418,219"
                        }
                    ]
                },
                {
                    id: 2,
                    title: "AHU Room",
                    polygons: [
                        {
                            id: "dummy_1",
                            polygon: "318,423,383,423,382,509,319,509"
                        },
                        {
                            id: "dummy_1",
                            polygon: "317,543,382,543,381,627,317,629"
                        },
                        {
                            id: "dummy_1",
                            polygon: "1114,422,1179,423,1178,506,1114,509"
                        },
                        {
                            id: "dummy_1",
                            polygon: "1114,543,1178,541,1178,628,1114,627"
                        }
                    ]
                }, {
                    id: 3,
                    title: "Staircase",
                    polygons: [
                        {
                            id: "dummy_1",
                            polygon: "530,447,598,448,598,549,529,548"
                        },
                        {
                            id: "dummy_1",
                            polygon: "888,503,954,503,956,603,888,604,"
                        },
                        {
                            id: "dummy_1",
                            polygon: "461,142,564,122,577,185,473,207"
                        },
                    ]
                },
                {
                    id: 4,
                    title: "Gents Restroom",
                    polygons: [
                        {
                            id: "dummy_1",
                            polygon: "997,395,1089,395,1090,434,1073,439,1072,461,1089,465,1090,505,966,505,967,464,997,457"
                        },
                        {
                            id: "dummy_1",
                            polygon: "406,556,433,556,433,572,441,573,441,551,517,548,516,589,487,590,487,659,406,659"
                        },
                    ]
                },
                {
                    id: 5,
                    title: "Ladies Restroom",
                    polygons: [
                        {
                            id: "dummy_1",
                            polygon: "963,557,1068,558,1068,545,1089,547,1094,625,963,627"
                        },
                        {
                            id: "dummy_1",
                            polygon: "404,421,520,421,520,493,407,498"
                        },
                    ]
                },
                {
                    id: 6,
                    title: "Office Area",
                    polygons: [
                        {
                            id: "dummy_1",
                            polygon: "585,84,588,127,565,136,576,188,521,201,526,226,470,245,464,231,383,250,363,155,388,148,378,124,206,183,129,220,80,262,41,322,25,381,24,440,36,499,66,550,129,623,196,686,261,747,346,815,467,899,557,947,564,663,483,665,403,665,404,631,314,629,315,416,638,419,640,391,631,83"
                        },
                        {
                            id: "dummy_1",
                            polygon: "631,81,747,77,866,81,1014,102,1114,127,1270,180,1357,220,1406,266,1444,334,1457,393,1449,471,1428,526,1363,607,1287,682,1128,819,1007,903,924,941,836,971,736,981,640,970,559,946,563,663,656,662,846,662,845,632,1184,627,1183,418,1093,421,1093,387,640,388"
                        },
                    ]
                },
            ]
        }
    },
    {
        id: 18,
        name: "18",
        area: "68,000 sqft",
        points: "725,321,854,271,952,259,1096,257,1248,268,1248,297,1103,284,961,289,795,317,728,345",
        gradientId: "grad10",
        anchorX: 1246,
        anchorY: 280,
        floorname: "18",
        area1: "68000 sqft",
        area2: "36000 sqft",
        unitplan: {
            image_2d: floor8,
            image_3d: floor8,
            sideContent: [
                {
                    id: 1,
                    title: "Lift Lobby",
                    polygons: [
                        {
                            id: "dummy_1",
                            polygon: "601,443,643,440,643,392,954,391,955,501,887,502,887,608,841,607,840,655,524,659,526,552,601,549"
                        },
                        {
                            id: "dummy_1",
                            polygon: "404,152,458,140,471,207,418,219"
                        }
                    ]
                },
                {
                    id: 2,
                    title: "AHU Room",
                    polygons: [
                        {
                            id: "dummy_1",
                            polygon: "318,423,383,423,382,509,319,509"
                        },
                        {
                            id: "dummy_1",
                            polygon: "317,543,382,543,381,627,317,629"
                        },
                        {
                            id: "dummy_1",
                            polygon: "1114,422,1179,423,1178,506,1114,509"
                        },
                        {
                            id: "dummy_1",
                            polygon: "1114,543,1178,541,1178,628,1114,627"
                        }
                    ]
                }, {
                    id: 3,
                    title: "Staircase",
                    polygons: [
                        {
                            id: "dummy_1",
                            polygon: "530,447,598,448,598,549,529,548"
                        },
                        {
                            id: "dummy_1",
                            polygon: "888,503,954,503,956,603,888,604,"
                        },
                        {
                            id: "dummy_1",
                            polygon: "461,142,564,122,577,185,473,207"
                        },
                    ]
                },
                {
                    id: 4,
                    title: "Gents Restroom",
                    polygons: [
                        {
                            id: "dummy_1",
                            polygon: "997,395,1089,395,1090,434,1073,439,1072,461,1089,465,1090,505,966,505,967,464,997,457"
                        },
                        {
                            id: "dummy_1",
                            polygon: "406,556,433,556,433,572,441,573,441,551,517,548,516,589,487,590,487,659,406,659"
                        },
                    ]
                },
                {
                    id: 5,
                    title: "Ladies Restroom",
                    polygons: [
                        {
                            id: "dummy_1",
                            polygon: "963,557,1068,558,1068,545,1089,547,1094,625,963,627"
                        },
                        {
                            id: "dummy_1",
                            polygon: "404,421,520,421,520,493,407,498"
                        },
                    ]
                },
                {
                    id: 6,
                    title: "Office Area",
                    polygons: [
                        {
                            id: "dummy_1",
                            polygon: "585,84,588,127,565,136,576,188,521,201,526,226,470,245,464,231,383,250,363,155,388,148,378,124,206,183,129,220,80,262,41,322,25,381,24,440,36,499,66,550,129,623,196,686,261,747,346,815,467,899,557,947,564,663,483,665,403,665,404,631,314,629,315,416,638,419,640,391,631,83"
                        },
                        {
                            id: "dummy_1",
                            polygon: "631,81,747,77,866,81,1014,102,1114,127,1270,180,1357,220,1406,266,1444,334,1457,393,1449,471,1428,526,1363,607,1287,682,1128,819,1007,903,924,941,836,971,736,981,640,970,559,946,563,663,656,662,846,662,845,632,1184,627,1183,418,1093,421,1093,387,640,388"
                        },
                    ]
                },
            ]
        }
    },
    {
        id: 17,
        name: "17",
        area: "68,000 sqft",
        points: "726,341,859,299,973,287,1090,285,1176,289,1248,298,1248,329,1162,317,1057,315,914,324,800,343,728,366",
        gradientId: "grad10",
        anchorX: 1246,
        anchorY: 310,
        floorname: "17",
        area1: "68000 sqft",
        area2: "68000 sqft",
        unitplan: {
            image_2d: floor8,
            image_3d: floor8,
            sideContent: [
                {
                    id: 1,
                    title: "Lift Lobby",
                    polygons: [
                        {
                            id: "dummy_1",
                            polygon: "601,443,643,440,643,392,954,391,955,501,887,502,887,608,841,607,840,655,524,659,526,552,601,549"
                        },
                        {
                            id: "dummy_1",
                            polygon: "404,152,458,140,471,207,418,219"
                        }
                    ]
                },
                {
                    id: 2,
                    title: "AHU Room",
                    polygons: [
                        {
                            id: "dummy_1",
                            polygon: "318,423,383,423,382,509,319,509"
                        },
                        {
                            id: "dummy_1",
                            polygon: "317,543,382,543,381,627,317,629"
                        },
                        {
                            id: "dummy_1",
                            polygon: "1114,422,1179,423,1178,506,1114,509"
                        },
                        {
                            id: "dummy_1",
                            polygon: "1114,543,1178,541,1178,628,1114,627"
                        }
                    ]
                }, {
                    id: 3,
                    title: "Staircase",
                    polygons: [
                        {
                            id: "dummy_1",
                            polygon: "530,447,598,448,598,549,529,548"
                        },
                        {
                            id: "dummy_1",
                            polygon: "888,503,954,503,956,603,888,604,"
                        },
                        {
                            id: "dummy_1",
                            polygon: "461,142,564,122,577,185,473,207"
                        },
                    ]
                },
                {
                    id: 4,
                    title: "Gents Restroom",
                    polygons: [
                        {
                            id: "dummy_1",
                            polygon: "997,395,1089,395,1090,434,1073,439,1072,461,1089,465,1090,505,966,505,967,464,997,457"
                        },
                        {
                            id: "dummy_1",
                            polygon: "406,556,433,556,433,572,441,573,441,551,517,548,516,589,487,590,487,659,406,659"
                        },
                    ]
                },
                {
                    id: 5,
                    title: "Ladies Restroom",
                    polygons: [
                        {
                            id: "dummy_1",
                            polygon: "963,557,1068,558,1068,545,1089,547,1094,625,963,627"
                        },
                        {
                            id: "dummy_1",
                            polygon: "404,421,520,421,520,493,407,498"
                        },
                    ]
                },
                {
                    id: 6,
                    title: "Office Area",
                    polygons: [
                        {
                            id: "dummy_1",
                            polygon: "585,84,588,127,565,136,576,188,521,201,526,226,470,245,464,231,383,250,363,155,388,148,378,124,206,183,129,220,80,262,41,322,25,381,24,440,36,499,66,550,129,623,196,686,261,747,346,815,467,899,557,947,564,663,483,665,403,665,404,631,314,629,315,416,638,419,640,391,631,83"
                        },
                        {
                            id: "dummy_1",
                            polygon: "631,81,747,77,866,81,1014,102,1114,127,1270,180,1357,220,1406,266,1444,334,1457,393,1449,471,1428,526,1363,607,1287,682,1128,819,1007,903,924,941,836,971,736,981,640,970,559,946,563,663,656,662,846,662,845,632,1184,627,1183,418,1093,421,1093,387,640,388"
                        },
                    ]
                },
            ]
        }
    },
    {
        id: 16,
        name: "16",
        area: "68,000 sqft",
        points: "728,366,845,333,952,319,1069,315,1174,319,1248,329,1246,361,1164,352,1078,352,973,350,884,355,814,373,730,396",
        gradientId: "grad10",
        anchorX: 1246,
        anchorY: 345,
        floorname: "16",
        area1: "68000 sqft",
        area2: "68000 sqft",
        unitplan: {
            image_2d: floor8,
            image_3d: floor8,
            sideContent: [
                {
                    id: 1,
                    title: "Lift Lobby",
                    polygons: [
                        {
                            id: "dummy_1",
                            polygon: "601,443,643,440,643,392,954,391,955,501,887,502,887,608,841,607,840,655,524,659,526,552,601,549"
                        },
                        {
                            id: "dummy_1",
                            polygon: "404,152,458,140,471,207,418,219"
                        }
                    ]
                },
                {
                    id: 2,
                    title: "AHU Room",
                    polygons: [
                        {
                            id: "dummy_1",
                            polygon: "318,423,383,423,382,509,319,509"
                        },
                        {
                            id: "dummy_1",
                            polygon: "317,543,382,543,381,627,317,629"
                        },
                        {
                            id: "dummy_1",
                            polygon: "1114,422,1179,423,1178,506,1114,509"
                        },
                        {
                            id: "dummy_1",
                            polygon: "1114,543,1178,541,1178,628,1114,627"
                        }
                    ]
                }, {
                    id: 3,
                    title: "Staircase",
                    polygons: [
                        {
                            id: "dummy_1",
                            polygon: "530,447,598,448,598,549,529,548"
                        },
                        {
                            id: "dummy_1",
                            polygon: "888,503,954,503,956,603,888,604,"
                        },
                        {
                            id: "dummy_1",
                            polygon: "461,142,564,122,577,185,473,207"
                        },
                    ]
                },
                {
                    id: 4,
                    title: "Gents Restroom",
                    polygons: [
                        {
                            id: "dummy_1",
                            polygon: "997,395,1089,395,1090,434,1073,439,1072,461,1089,465,1090,505,966,505,967,464,997,457"
                        },
                        {
                            id: "dummy_1",
                            polygon: "406,556,433,556,433,572,441,573,441,551,517,548,516,589,487,590,487,659,406,659"
                        },
                    ]
                },
                {
                    id: 5,
                    title: "Ladies Restroom",
                    polygons: [
                        {
                            id: "dummy_1",
                            polygon: "963,557,1068,558,1068,545,1089,547,1094,625,963,627"
                        },
                        {
                            id: "dummy_1",
                            polygon: "404,421,520,421,520,493,407,498"
                        },
                    ]
                },
                {
                    id: 6,
                    title: "Office Area",
                    polygons: [
                        {
                            id: "dummy_1",
                            polygon: "585,84,588,127,565,136,576,188,521,201,526,226,470,245,464,231,383,250,363,155,388,148,378,124,206,183,129,220,80,262,41,322,25,381,24,440,36,499,66,550,129,623,196,686,261,747,346,815,467,899,557,947,564,663,483,665,403,665,404,631,314,629,315,416,638,419,640,391,631,83"
                        },
                        {
                            id: "dummy_1",
                            polygon: "631,81,747,77,866,81,1014,102,1114,127,1270,180,1357,220,1406,266,1444,334,1457,393,1449,471,1428,526,1363,607,1287,682,1128,819,1007,903,924,941,836,971,736,981,640,970,559,946,563,663,656,662,846,662,845,632,1184,627,1183,418,1093,421,1093,387,640,388"
                        },
                    ]
                },
            ]
        }
    },
    {
        id: 15,
        name: "15",
        area: "68,000 sqft",
        points: "730,398,849,362,982,350,1150,350,1244,357,1248,388,1080,381,921,385,730,422",
        gradientId: "grad9",
        anchorX: 1240,
        anchorY: 370,
        floorname: "15",
        area1: "68000 sqft",
        area2: "68000 sqft",
        unitplan: {
            image_2d: floor8,
            image_3d: floor8,
            sideContent: [
                {
                    id: 1,
                    title: "Lift Lobby",
                    polygons: [
                        {
                            id: "dummy_1",
                            polygon: "601,443,643,440,643,392,954,391,955,501,887,502,887,608,841,607,840,655,524,659,526,552,601,549"
                        },
                        {
                            id: "dummy_1",
                            polygon: "404,152,458,140,471,207,418,219"
                        }
                    ]
                },
                {
                    id: 2,
                    title: "AHU Room",
                    polygons: [
                        {
                            id: "dummy_1",
                            polygon: "318,423,383,423,382,509,319,509"
                        },
                        {
                            id: "dummy_1",
                            polygon: "317,543,382,543,381,627,317,629"
                        },
                        {
                            id: "dummy_1",
                            polygon: "1114,422,1179,423,1178,506,1114,509"
                        },
                        {
                            id: "dummy_1",
                            polygon: "1114,543,1178,541,1178,628,1114,627"
                        }
                    ]
                }, {
                    id: 3,
                    title: "Staircase",
                    polygons: [
                        {
                            id: "dummy_1",
                            polygon: "530,447,598,448,598,549,529,548"
                        },
                        {
                            id: "dummy_1",
                            polygon: "888,503,954,503,956,603,888,604,"
                        },
                        {
                            id: "dummy_1",
                            polygon: "461,142,564,122,577,185,473,207"
                        },
                    ]
                },
                {
                    id: 4,
                    title: "Gents Restroom",
                    polygons: [
                        {
                            id: "dummy_1",
                            polygon: "997,395,1089,395,1090,434,1073,439,1072,461,1089,465,1090,505,966,505,967,464,997,457"
                        },
                        {
                            id: "dummy_1",
                            polygon: "406,556,433,556,433,572,441,573,441,551,517,548,516,589,487,590,487,659,406,659"
                        },
                    ]
                },
                {
                    id: 5,
                    title: "Ladies Restroom",
                    polygons: [
                        {
                            id: "dummy_1",
                            polygon: "963,557,1068,558,1068,545,1089,547,1094,625,963,627"
                        },
                        {
                            id: "dummy_1",
                            polygon: "404,421,520,421,520,493,407,498"
                        },
                    ]
                },
                {
                    id: 6,
                    title: "Office Area",
                    polygons: [
                        {
                            id: "dummy_1",
                            polygon: "585,84,588,127,565,136,576,188,521,201,526,226,470,245,464,231,383,250,363,155,388,148,378,124,206,183,129,220,80,262,41,322,25,381,24,440,36,499,66,550,129,623,196,686,261,747,346,815,467,899,557,947,564,663,483,665,403,665,404,631,314,629,315,416,638,419,640,391,631,83"
                        },
                        {
                            id: "dummy_1",
                            polygon: "631,81,747,77,866,81,1014,102,1114,127,1270,180,1357,220,1406,266,1444,334,1457,393,1449,471,1428,526,1363,607,1287,682,1128,819,1007,903,924,941,836,971,736,981,640,970,559,946,563,663,656,662,846,662,845,632,1184,627,1183,418,1093,421,1093,387,640,388"
                        },
                    ]
                },
            ]
        }
    },
    {
        id: 14,
        name: "14",
        area: "68,000 sqft",
        points: "730,420,854,391,980,382,1094,382,1211,385,1248,387,1248,419,1117,415,1012,413,910,415,816,427,730,445",
        gradientId: "grad8",
        anchorX: 1237,
        anchorY: 400,
        floorname: "14",
        area1: "68000 sqft",
        area2: "68000 sqft",
        unitplan: {
            image_2d: floor7,
            image_3d: floor7,
            sideContent: [
                {
                    id: 1,
                    title: "Lift Lobby",
                    polygons: [
                        {
                            id: "lift_1",
                            polygon: "601,443,643,440,643,392,954,391,955,501,887,502,887,608,841,607,840,655,524,659,526,552,601,549",
                        },
                        {
                            id: "lift_2",
                            polygon: "404,152,458,140,471,207,418,219",
                        }
                    ]
                },
                {
                    id: 2,
                    title: "AHU Room",
                    polygons: [
                        {
                            id: "ahu_1",
                            polygon: "1111,421,1177,422,1178,511,1111,510",
                        },
                        {
                            id: "ahu_2",
                            polygon: "1111,540,1181,541,1178,628,1112,627",
                        },
                        {
                            id: "ahu_3",
                            polygon: "322,612,366,613,366,543,387,543,387,699,323,697",
                        }
                    ]
                },
                {
                    id: 3,
                    title: "Staircase",
                    polygons: [
                        {
                            id: "stair_1",
                            polygon: "530,447,598,448,598,549,529,548",
                        },
                        {
                            id: "stair_2",
                            polygon: "888,503,954,503,956,603,888,604",
                        },
                        {
                            id: "stair_3",
                            polygon: "461,142,564,122,577,185,473,207",
                        }
                    ]
                },
                {
                    id: 4,
                    title: "Gents Restroom",
                    polygons: [
                        {
                            id: "gents_1",
                            polygon: "996,388,1039,389,1039,413,1060,412,1060,438,1035,437,1038,518,1013,518,1010,502,968,503,967,463,996,460",
                        },
                        {
                            id: "gents_2",
                            polygon: "454,543,521,543,521,583,491,586,491,654,454,653",
                        }
                    ]
                },
                {
                    id: 5,
                    title: "Ladies Restroom",
                    polygons: [
                        {
                            id: "ladies_1",
                            polygon: "1010,523,1038,523,1036,593,996,594,994,623,979,624,979,599,964,598,963,557,1009,554",
                        },
                        {
                            id: "ladies_2",
                            polygon: "414,482,477,484,478,524,452,522,453,651,423,653,421,598,410,598,411,543",
                        }
                    ]
                },
                {
                    id: 6,
                    title: "Office Area",
                    polygons: [
                        {
                            id: "ladies_1",
                            polygon: "260,704,389,703,390,633,407,632,408,641,418,642,419,661,845,662,845,633,1181,631,1179,419,1142,418,1144,387,785,384,786,235,655,232,487,266,474,211,584,186,575,151,589,143,576,89,646,81,722,79,791,80,862,83,959,94,1043,111,1146,138,1275,182,1352,223,1402,262,1430,312,1447,351,1453,387,1451,446,1439,489,1420,527,1396,564,1331,631,1284,678,1211,745,1111,827,1028,881,960,924,883,954,799,970,728,974,643,962,557,939,440,877,271,738,244,718",
                        },
                    ]
                },
                {
                    id: 7,
                    title: "Refuge Area",
                    polygons: [
                        {
                            id: "ladies_1",
                            polygon: "390,124,397,149,372,158,391,246,474,232,483,272,656,240,783,240,781,388,638,392,638,422,524,422,526,440,513,441,513,464,522,464,522,493,483,495,483,481,410,481,411,465,424,462,424,441,410,439,411,421,387,419,386,510,408,511,408,539,364,539,366,610,319,611,319,699,258,700,243,721,127,604,66,528,39,472,31,421,36,375,49,333,69,287,100,250,141,218,233,177",
                        },
                    ]
                },
            ]
        }
    },
    {
        id: 13,
        name: "13",
        area: "68,000 sqft",
        points: "726,447,824,427,921,415,1052,410,1150,415,1244,419,1246,452,1083,443,977,445,893,448,803,459,726,473",
        gradientId: "grad7",
        anchorX: 1234,
        anchorY: 440,
        floorname: "13",
        area1: "68000 sqft",
        area2: "36000 sqft",
        unitplan: {
            image_2d: floor8,
            image_3d: floor8,
            sideContent: [
                {
                    id: 1,
                    title: "Lift Lobby",
                    polygons: [
                        {
                            id: "dummy_1",
                            polygon: "601,443,643,440,643,392,954,391,955,501,887,502,887,608,841,607,840,655,524,659,526,552,601,549"
                        },
                        {
                            id: "dummy_1",
                            polygon: "404,152,458,140,471,207,418,219"
                        }
                    ]
                },
                {
                    id: 2,
                    title: "AHU Room",
                    polygons: [
                        {
                            id: "dummy_1",
                            polygon: "318,423,383,423,382,509,319,509"
                        },
                        {
                            id: "dummy_1",
                            polygon: "317,543,382,543,381,627,317,629"
                        },
                        {
                            id: "dummy_1",
                            polygon: "1114,422,1179,423,1178,506,1114,509"
                        },
                        {
                            id: "dummy_1",
                            polygon: "1114,543,1178,541,1178,628,1114,627"
                        }
                    ]
                }, {
                    id: 3,
                    title: "Staircase",
                    polygons: [
                        {
                            id: "dummy_1",
                            polygon: "530,447,598,448,598,549,529,548"
                        },
                        {
                            id: "dummy_1",
                            polygon: "888,503,954,503,956,603,888,604,"
                        },
                        {
                            id: "dummy_1",
                            polygon: "461,142,564,122,577,185,473,207"
                        },
                    ]
                },
                {
                    id: 4,
                    title: "Gents Restroom",
                    polygons: [
                        {
                            id: "dummy_1",
                            polygon: "997,395,1089,395,1090,434,1073,439,1072,461,1089,465,1090,505,966,505,967,464,997,457"
                        },
                        {
                            id: "dummy_1",
                            polygon: "406,556,433,556,433,572,441,573,441,551,517,548,516,589,487,590,487,659,406,659"
                        },
                    ]
                },
                {
                    id: 5,
                    title: "Ladies Restroom",
                    polygons: [
                        {
                            id: "dummy_1",
                            polygon: "963,557,1068,558,1068,545,1089,547,1094,625,963,627"
                        },
                        {
                            id: "dummy_1",
                            polygon: "404,421,520,421,520,493,407,498"
                        },
                    ]
                },
                {
                    id: 6,
                    title: "Office Area",
                    polygons: [
                        {
                            id: "dummy_1",
                            polygon: "585,84,588,127,565,136,576,188,521,201,526,226,470,245,464,231,383,250,363,155,388,148,378,124,206,183,129,220,80,262,41,322,25,381,24,440,36,499,66,550,129,623,196,686,261,747,346,815,467,899,557,947,564,663,483,665,403,665,404,631,314,629,315,416,638,419,640,391,631,83"
                        },
                        {
                            id: "dummy_1",
                            polygon: "631,81,747,77,866,81,1014,102,1114,127,1270,180,1357,220,1406,266,1444,334,1457,393,1449,471,1428,526,1363,607,1287,682,1128,819,1007,903,924,941,836,971,736,981,640,970,559,946,563,663,656,662,846,662,845,632,1184,627,1183,418,1093,421,1093,387,640,388"
                        },
                    ]
                },
            ]
        }
    },
    {
        id: 12,
        name: "12",
        area: "68,000 sqft",
        points: "726,471,882,448,1080,445,1173,448,1246,454,1248,478,1087,473,931,475,842,480,725,492",
        gradientId: "grad6",
        anchorX: 1231,
        anchorY: 470,
        floorname: "12",
        area1: "68000 sqft",
        area2: "36000 sqft",
        unitplan: {
            image_2d: floor8,
            image_3d: floor8,
            sideContent: [
                {
                    id: 1,
                    title: "Lift Lobby",
                    polygons: [
                        {
                            id: "dummy_1",
                            polygon: "601,443,643,440,643,392,954,391,955,501,887,502,887,608,841,607,840,655,524,659,526,552,601,549"
                        },
                        {
                            id: "dummy_1",
                            polygon: "404,152,458,140,471,207,418,219"
                        }
                    ]
                },
                {
                    id: 2,
                    title: "AHU Room",
                    polygons: [
                        {
                            id: "dummy_1",
                            polygon: "318,423,383,423,382,509,319,509"
                        },
                        {
                            id: "dummy_1",
                            polygon: "317,543,382,543,381,627,317,629"
                        },
                        {
                            id: "dummy_1",
                            polygon: "1114,422,1179,423,1178,506,1114,509"
                        },
                        {
                            id: "dummy_1",
                            polygon: "1114,543,1178,541,1178,628,1114,627"
                        }
                    ]
                }, {
                    id: 3,
                    title: "Staircase",
                    polygons: [
                        {
                            id: "dummy_1",
                            polygon: "530,447,598,448,598,549,529,548"
                        },
                        {
                            id: "dummy_1",
                            polygon: "888,503,954,503,956,603,888,604,"
                        },
                        {
                            id: "dummy_1",
                            polygon: "461,142,564,122,577,185,473,207"
                        },
                    ]
                },
                {
                    id: 4,
                    title: "Gents Restroom",
                    polygons: [
                        {
                            id: "dummy_1",
                            polygon: "997,395,1089,395,1090,434,1073,439,1072,461,1089,465,1090,505,966,505,967,464,997,457"
                        },
                        {
                            id: "dummy_1",
                            polygon: "406,556,433,556,433,572,441,573,441,551,517,548,516,589,487,590,487,659,406,659"
                        },
                    ]
                },
                {
                    id: 5,
                    title: "Ladies Restroom",
                    polygons: [
                        {
                            id: "dummy_1",
                            polygon: "963,557,1068,558,1068,545,1089,547,1094,625,963,627"
                        },
                        {
                            id: "dummy_1",
                            polygon: "404,421,520,421,520,493,407,498"
                        },
                    ]
                },
                {
                    id: 6,
                    title: "Office Area",
                    polygons: [
                        {
                            id: "dummy_1",
                            polygon: "585,84,588,127,565,136,576,188,521,201,526,226,470,245,464,231,383,250,363,155,388,148,378,124,206,183,129,220,80,262,41,322,25,381,24,440,36,499,66,550,129,623,196,686,261,747,346,815,467,899,557,947,564,663,483,665,403,665,404,631,314,629,315,416,638,419,640,391,631,83"
                        },
                        {
                            id: "dummy_1",
                            polygon: "631,81,747,77,866,81,1014,102,1114,127,1270,180,1357,220,1406,266,1444,334,1457,393,1449,471,1428,526,1363,607,1287,682,1128,819,1007,903,924,941,836,971,736,981,640,970,559,946,563,663,656,662,846,662,845,632,1184,627,1183,418,1093,421,1093,387,640,388"
                        },
                    ]
                },
            ]
        }
    },
    {
        id: 11,
        name: "11",
        area: "68,000 sqft",
        points: "726,494,887,476,1010,473,1139,475,1225,478,1246,482,1244,504,1108,499,964,499,847,503,726,517",
        gradientId: "grad5",
        anchorX: 1228,
        anchorY: 490,
        floorname: "11",
        area1: "68000 sqft",
        area2: "36000 sqft",
        unitplan: {
            image_2d: floor8,
            image_3d: floor8,
            sideContent: [
                {
                    id: 1,
                    title: "Lift Lobby",
                    polygons: [
                        {
                            id: "dummy_1",
                            polygon: "601,443,643,440,643,392,954,391,955,501,887,502,887,608,841,607,840,655,524,659,526,552,601,549"
                        },
                        {
                            id: "dummy_1",
                            polygon: "404,152,458,140,471,207,418,219"
                        }
                    ]
                },
                {
                    id: 2,
                    title: "AHU Room",
                    polygons: [
                        {
                            id: "dummy_1",
                            polygon: "318,423,383,423,382,509,319,509"
                        },
                        {
                            id: "dummy_1",
                            polygon: "317,543,382,543,381,627,317,629"
                        },
                        {
                            id: "dummy_1",
                            polygon: "1114,422,1179,423,1178,506,1114,509"
                        },
                        {
                            id: "dummy_1",
                            polygon: "1114,543,1178,541,1178,628,1114,627"
                        }
                    ]
                }, {
                    id: 3,
                    title: "Staircase",
                    polygons: [
                        {
                            id: "dummy_1",
                            polygon: "530,447,598,448,598,549,529,548"
                        },
                        {
                            id: "dummy_1",
                            polygon: "888,503,954,503,956,603,888,604,"
                        },
                        {
                            id: "dummy_1",
                            polygon: "461,142,564,122,577,185,473,207"
                        },
                    ]
                },
                {
                    id: 4,
                    title: "Gents Restroom",
                    polygons: [
                        {
                            id: "dummy_1",
                            polygon: "997,395,1089,395,1090,434,1073,439,1072,461,1089,465,1090,505,966,505,967,464,997,457"
                        },
                        {
                            id: "dummy_1",
                            polygon: "406,556,433,556,433,572,441,573,441,551,517,548,516,589,487,590,487,659,406,659"
                        },
                    ]
                },
                {
                    id: 5,
                    title: "Ladies Restroom",
                    polygons: [
                        {
                            id: "dummy_1",
                            polygon: "963,557,1068,558,1068,545,1089,547,1094,625,963,627"
                        },
                        {
                            id: "dummy_1",
                            polygon: "404,421,520,421,520,493,407,498"
                        },
                    ]
                },
                {
                    id: 6,
                    title: "Office Area",
                    polygons: [
                        {
                            id: "dummy_1",
                            polygon: "585,84,588,127,565,136,576,188,521,201,526,226,470,245,464,231,383,250,363,155,388,148,378,124,206,183,129,220,80,262,41,322,25,381,24,440,36,499,66,550,129,623,196,686,261,747,346,815,467,899,557,947,564,663,483,665,403,665,404,631,314,629,315,416,638,419,640,391,631,83"
                        },
                        {
                            id: "dummy_1",
                            polygon: "631,81,747,77,866,81,1014,102,1114,127,1270,180,1357,220,1406,266,1444,334,1457,393,1449,471,1428,526,1363,607,1287,682,1128,819,1007,903,924,941,836,971,736,981,640,970,559,946,563,663,656,662,846,662,845,632,1184,627,1183,418,1093,421,1093,387,640,388"
                        },
                    ]
                },
            ]
        }
    },
    {
        id: 10,
        name: "10",
        area: "68,000 sqft",
        points: "728,519,875,503,1045,498,1122,501,1213,506,1246,508,1246,538,1026,531,929,534,800,540,728,547",
        gradientId: "grad4",
        anchorX: 1225,
        anchorY: 520,
        floorname: "10",
        area1: "68000 sqft",
        area2: "36000 sqft",
        unitplan: {
            image_2d: floor8,
            image_3d: floor8,
            sideContent: [
                {
                    id: 1,
                    title: "Lift Lobby",
                    polygons: [
                        {
                            id: "dummy_1",
                            polygon: "601,443,643,440,643,392,954,391,955,501,887,502,887,608,841,607,840,655,524,659,526,552,601,549"
                        },
                        {
                            id: "dummy_1",
                            polygon: "404,152,458,140,471,207,418,219"
                        }
                    ]
                },
                {
                    id: 2,
                    title: "AHU Room",
                    polygons: [
                        {
                            id: "dummy_1",
                            polygon: "318,423,383,423,382,509,319,509"
                        },
                        {
                            id: "dummy_1",
                            polygon: "317,543,382,543,381,627,317,629"
                        },
                        {
                            id: "dummy_1",
                            polygon: "1114,422,1179,423,1178,506,1114,509"
                        },
                        {
                            id: "dummy_1",
                            polygon: "1114,543,1178,541,1178,628,1114,627"
                        }
                    ]
                }, {
                    id: 3,
                    title: "Staircase",
                    polygons: [
                        {
                            id: "dummy_1",
                            polygon: "530,447,598,448,598,549,529,548"
                        },
                        {
                            id: "dummy_1",
                            polygon: "888,503,954,503,956,603,888,604,"
                        },
                        {
                            id: "dummy_1",
                            polygon: "461,142,564,122,577,185,473,207"
                        },
                    ]
                },
                {
                    id: 4,
                    title: "Gents Restroom",
                    polygons: [
                        {
                            id: "dummy_1",
                            polygon: "997,395,1089,395,1090,434,1073,439,1072,461,1089,465,1090,505,966,505,967,464,997,457"
                        },
                        {
                            id: "dummy_1",
                            polygon: "406,556,433,556,433,572,441,573,441,551,517,548,516,589,487,590,487,659,406,659"
                        },
                    ]
                },
                {
                    id: 5,
                    title: "Ladies Restroom",
                    polygons: [
                        {
                            id: "dummy_1",
                            polygon: "963,557,1068,558,1068,545,1089,547,1094,625,963,627"
                        },
                        {
                            id: "dummy_1",
                            polygon: "404,421,520,421,520,493,407,498"
                        },
                    ]
                },
                {
                    id: 6,
                    title: "Office Area",
                    polygons: [
                        {
                            id: "dummy_1",
                            polygon: "585,84,588,127,565,136,576,188,521,201,526,226,470,245,464,231,383,250,363,155,388,148,378,124,206,183,129,220,80,262,41,322,25,381,24,440,36,499,66,550,129,623,196,686,261,747,346,815,467,899,557,947,564,663,483,665,403,665,404,631,314,629,315,416,638,419,640,391,631,83"
                        },
                        {
                            id: "dummy_1",
                            polygon: "631,81,747,77,866,81,1014,102,1114,127,1270,180,1357,220,1406,266,1444,334,1457,393,1449,471,1428,526,1363,607,1287,682,1128,819,1007,903,924,941,836,971,736,981,640,970,559,946,563,663,656,662,846,662,845,632,1184,627,1183,418,1093,421,1093,387,640,388"
                        },
                    ]
                },
            ]
        }
    },
    {
        id: 9,
        name: "9",
        area: "68,000 sqft",
        points: "730,547,847,536,971,532,1076,531,1173,534,1248,540,1248,568,996,562,847,566,726,576",
        gradientId: "grad3",
        anchorX: 1222,
        anchorY: 555,
        floorname: "9",
        area1: "68000 sqft",
        area2: "36000 sqft",
        unitplan: {
            image_2d: floor8,
            image_3d: floor8,
            sideContent: [
                {
                    id: 1,
                    title: "Lift Lobby",
                    polygons: [
                        {
                            id: "dummy_1",
                            polygon: "601,443,643,440,643,392,954,391,955,501,887,502,887,608,841,607,840,655,524,659,526,552,601,549"
                        },
                        {
                            id: "dummy_1",
                            polygon: "404,152,458,140,471,207,418,219"
                        }
                    ]
                },
                {
                    id: 2,
                    title: "AHU Room",
                    polygons: [
                        {
                            id: "dummy_1",
                            polygon: "318,423,383,423,382,509,319,509"
                        },
                        {
                            id: "dummy_1",
                            polygon: "317,543,382,543,381,627,317,629"
                        },
                        {
                            id: "dummy_1",
                            polygon: "1114,422,1179,423,1178,506,1114,509"
                        },
                        {
                            id: "dummy_1",
                            polygon: "1114,543,1178,541,1178,628,1114,627"
                        }
                    ]
                }, {
                    id: 3,
                    title: "Staircase",
                    polygons: [
                        {
                            id: "dummy_1",
                            polygon: "530,447,598,448,598,549,529,548"
                        },
                        {
                            id: "dummy_1",
                            polygon: "888,503,954,503,956,603,888,604,"
                        },
                        {
                            id: "dummy_1",
                            polygon: "461,142,564,122,577,185,473,207"
                        },
                    ]
                },
                {
                    id: 4,
                    title: "Gents Restroom",
                    polygons: [
                        {
                            id: "dummy_1",
                            polygon: "997,395,1089,395,1090,434,1073,439,1072,461,1089,465,1090,505,966,505,967,464,997,457"
                        },
                        {
                            id: "dummy_1",
                            polygon: "406,556,433,556,433,572,441,573,441,551,517,548,516,589,487,590,487,659,406,659"
                        },
                    ]
                },
                {
                    id: 5,
                    title: "Ladies Restroom",
                    polygons: [
                        {
                            id: "dummy_1",
                            polygon: "963,557,1068,558,1068,545,1089,547,1094,625,963,627"
                        },
                        {
                            id: "dummy_1",
                            polygon: "404,421,520,421,520,493,407,498"
                        },
                    ]
                },
                {
                    id: 6,
                    title: "Office Area",
                    polygons: [
                        {
                            id: "dummy_1",
                            polygon: "585,84,588,127,565,136,576,188,521,201,526,226,470,245,464,231,383,250,363,155,388,148,378,124,206,183,129,220,80,262,41,322,25,381,24,440,36,499,66,550,129,623,196,686,261,747,346,815,467,899,557,947,564,663,483,665,403,665,404,631,314,629,315,416,638,419,640,391,631,83"
                        },
                        {
                            id: "dummy_1",
                            polygon: "631,81,747,77,866,81,1014,102,1114,127,1270,180,1357,220,1406,266,1444,334,1457,393,1449,471,1428,526,1363,607,1287,682,1128,819,1007,903,924,941,836,971,736,981,640,970,559,946,563,663,656,662,846,662,845,632,1184,627,1183,418,1093,421,1093,387,640,388"
                        },
                    ]
                },
            ]
        }
    },
    {
        id: 8,
        name: "8",
        area: "68,000 sqft",
        points: "726,578,884,562,968,560,1057,560,1141,564,1202,566,1248,569,1246,595,926,590,803,592,725,599",
        gradientId: "grad3",
        anchorX: 1222,
        anchorY: 580,
        floorname: "8",
        area1: "68000 sqft",
        area2: "36000 sqft",
        unitplan: {
            image_2d: floor8,
            image_3d: floor8,
            sideContent: [
                {
                    id: 1,
                    title: "Lift Lobby",
                    polygons: [
                        {
                            id: "dummy_1",
                            polygon: "601,443,643,440,643,392,954,391,955,501,887,502,887,608,841,607,840,655,524,659,526,552,601,549"
                        },
                        {
                            id: "dummy_1",
                            polygon: "404,152,458,140,471,207,418,219"
                        }
                    ]
                },
                {
                    id: 2,
                    title: "AHU Room",
                    polygons: [
                        {
                            id: "dummy_1",
                            polygon: "318,423,383,423,382,509,319,509"
                        },
                        {
                            id: "dummy_1",
                            polygon: "317,543,382,543,381,627,317,629"
                        },
                        {
                            id: "dummy_1",
                            polygon: "1114,422,1179,423,1178,506,1114,509"
                        },
                        {
                            id: "dummy_1",
                            polygon: "1114,543,1178,541,1178,628,1114,627"
                        }
                    ]
                }, {
                    id: 3,
                    title: "Staircase",
                    polygons: [
                        {
                            id: "dummy_1",
                            polygon: "530,447,598,448,598,549,529,548"
                        },
                        {
                            id: "dummy_1",
                            polygon: "888,503,954,503,956,603,888,604,"
                        },
                        {
                            id: "dummy_1",
                            polygon: "461,142,564,122,577,185,473,207"
                        },
                    ]
                },
                {
                    id: 4,
                    title: "Gents Restroom",
                    polygons: [
                        {
                            id: "dummy_1",
                            polygon: "997,395,1089,395,1090,434,1073,439,1072,461,1089,465,1090,505,966,505,967,464,997,457"
                        },
                        {
                            id: "dummy_1",
                            polygon: "406,556,433,556,433,572,441,573,441,551,517,548,516,589,487,590,487,659,406,659"
                        },
                    ]
                },
                {
                    id: 5,
                    title: "Ladies Restroom",
                    polygons: [
                        {
                            id: "dummy_1",
                            polygon: "963,557,1068,558,1068,545,1089,547,1094,625,963,627"
                        },
                        {
                            id: "dummy_1",
                            polygon: "404,421,520,421,520,493,407,498"
                        },
                    ]
                },
                {
                    id: 6,
                    title: "Office Area",
                    polygons: [
                        {
                            id: "dummy_1",
                            polygon: "585,84,588,127,565,136,576,188,521,201,526,226,470,245,464,231,383,250,363,155,388,148,378,124,206,183,129,220,80,262,41,322,25,381,24,440,36,499,66,550,129,623,196,686,261,747,346,815,467,899,557,947,564,663,483,665,403,665,404,631,314,629,315,416,638,419,640,391,631,83"
                        },
                        {
                            id: "dummy_1",
                            polygon: "631,81,747,77,866,81,1014,102,1114,127,1270,180,1357,220,1406,266,1444,334,1457,393,1449,471,1428,526,1363,607,1287,682,1128,819,1007,903,924,941,836,971,736,981,640,970,559,946,563,663,656,662,846,662,845,632,1184,627,1183,418,1093,421,1093,387,640,388"
                        },
                    ]
                },
            ]
        }
    },
    {
        id: 7,
        name: "7",
        area: "68,000 sqft",
        points: "726,598,875,589,1047,589,1167,592,1244,596,1243,612,1111,605,900,606,793,610,725,617",
        gradientId: "grad3",
        anchorX: 1222,
        anchorY: 600,
        floorname: "7",
        area1: "68000 sqft",
        area2: "36000 sqft",
        unitplan: {
            image_2d: floor7,
            image_3d: floor7,
            sideContent: [
                {
                    id: 1,
                    title: "Lift Lobby",
                    polygons: [
                        {
                            id: "lift_1",
                            polygon: "601,443,643,440,643,392,954,391,955,501,887,502,887,608,841,607,840,655,524,659,526,552,601,549",
                        },
                        {
                            id: "lift_2",
                            polygon: "404,152,458,140,471,207,418,219",
                        }
                    ]
                },
                {
                    id: 2,
                    title: "AHU Room",
                    polygons: [
                        {
                            id: "ahu_1",
                            polygon: "1111,421,1177,422,1178,511,1111,510",
                        },
                        {
                            id: "ahu_2",
                            polygon: "1111,540,1181,541,1178,628,1112,627",
                        },
                        {
                            id: "ahu_3",
                            polygon: "322,612,366,613,366,543,387,543,387,699,323,697",
                        }
                    ]
                },
                {
                    id: 3,
                    title: "Staircase",
                    polygons: [
                        {
                            id: "stair_1",
                            polygon: "530,447,598,448,598,549,529,548",
                        },
                        {
                            id: "stair_2",
                            polygon: "888,503,954,503,956,603,888,604",
                        },
                        {
                            id: "stair_3",
                            polygon: "461,142,564,122,577,185,473,207",
                        }
                    ]
                },
                {
                    id: 4,
                    title: "Gents Restroom",
                    polygons: [
                        {
                            id: "gents_1",
                            polygon: "996,388,1039,389,1039,413,1060,412,1060,438,1035,437,1038,518,1013,518,1010,502,968,503,967,463,996,460",
                        },
                        {
                            id: "gents_2",
                            polygon: "454,543,521,543,521,583,491,586,491,654,454,653",
                        }
                    ]
                },
                {
                    id: 5,
                    title: "Ladies Restroom",
                    polygons: [
                        {
                            id: "ladies_1",
                            polygon: "1010,523,1038,523,1036,593,996,594,994,623,979,624,979,599,964,598,963,557,1009,554",
                        },
                        {
                            id: "ladies_2",
                            polygon: "414,482,477,484,478,524,452,522,453,651,423,653,421,598,410,598,411,543",
                        }
                    ]
                },
                {
                    id: 6,
                    title: "Office Area",
                    polygons: [
                        {
                            id: "ladies_1",
                            polygon: "260,704,389,703,390,633,407,632,408,641,418,642,419,661,845,662,845,633,1181,631,1179,419,1142,418,1144,387,785,384,786,235,655,232,487,266,474,211,584,186,575,151,589,143,576,89,646,81,722,79,791,80,862,83,959,94,1043,111,1146,138,1275,182,1352,223,1402,262,1430,312,1447,351,1453,387,1451,446,1439,489,1420,527,1396,564,1331,631,1284,678,1211,745,1111,827,1028,881,960,924,883,954,799,970,728,974,643,962,557,939,440,877,271,738,244,718",
                        },
                    ]
                },
                {
                    id: 7,
                    title: "Refuge Area",
                    polygons: [
                        {
                            id: "ladies_1",
                            polygon: "390,124,397,149,372,158,391,246,474,232,483,272,656,240,783,240,781,388,638,392,638,422,524,422,526,440,513,441,513,464,522,464,522,493,483,495,483,481,410,481,411,465,424,462,424,441,410,439,411,421,387,419,386,510,408,511,408,539,364,539,366,610,319,611,319,699,258,700,243,721,127,604,66,528,39,472,31,421,36,375,49,333,69,287,100,250,141,218,233,177",
                        },
                    ]
                },
            ]
        }
    },
    {
        id: 0,
        name: "Ground",
        area: "68,000 sqft",
        points: "728,732,728,773,1248,771,1248,727",
        gradientId: "grad3",
        anchorX: 1250,
        anchorY: 750,
        floorname: "Ground",
        area1: "68000 sqft",
        area2: "36000 sqft",
        unitplan: {
            image_2d: floorGround,
            image_3d: floorGround,
            sideContent: [
                {
                    id: 1,
                    title: "Double Heighted Lobby",
                    polygons: [
                        {
                            id: "double_heighted_lobby_1",
                            polygon: "496,631,905,629,918,623,922,613,992,613,1045,615,1048,631,1087,629,1132,807,1063,860,526,865,526,665,498,661"
                        }
                    ]
                },
                {
                    id: 2,
                    title: "Lift Lobby",
                    polygons: [
                        {
                            id: "lift_lobby_1",
                            polygon: "617,423,758,421,758,624,618,625"
                        },
                        {
                            id: "lift_lobby_2",
                            polygon: "758,425,896,421,896,629,757,629"
                        },
                        {
                            id: "lift_lobby_3",
                            polygon: "989,448,1086,448,1087,611,990,612"
                        }
                    ]
                },
                {
                    id: 3,
                    title: "Entrance Lobby",
                    polygons: [
                        {
                            id: "entrance_lobby_1",
                            polygon: "525,864,1061,864,1007,901,958,925,878,953,812,966,745,969,655,958,585,937,528,910"
                        }
                    ]
                },
                {
                    id: 4,
                    title: "Kitchen",
                    polygons: [
                        {
                            id: "kitchen_1",
                            polygon: "1139,414,1247,413,1247,468,1240,498,1228,526,1205,556,1179,578,1153,594,1091,602,1089,490,1141,492"
                        }
                    ]
                },
                {
                    id: 5,
                    title: "Fine Dine Restaurant",
                    polygons: [
                        {
                            id: "fine_dine_restaurant_1",
                            polygon: "1249,468,1447,465,1440,490,1427,519,1410,545,1389,570,1359,606,1335,631,1306,659,1276,686,1263,701,1243,717,1212,741,1188,766,1157,789,1132,807,1098,670,1087,620,1104,623,1104,604,1133,600,1173,586,1211,554,1234,519"
                        }
                    ]
                },
                {
                    id: 6,
                    title: "Staircase",
                    polygons: [
                        {
                            id: "staircase_1",
                            polygon: "899,505,967,507,966,604,900,608"
                        },
                        {
                            id: "staircase_2",
                            polygon: "546,450,615,450,614,551,545,553"
                        },
                        {
                            id: "staircase_3",
                            polygon: "478,147,583,128,595,190,492,214"
                        },
                        {
                            id: "staircase_4",
                            polygon: "439,769,490,769,491,838,437,836"
                        }
                    ]
                },
                {
                    id: 7,
                    title: "Sub Station",
                    polygons: [
                        {
                            id: "sub_station_1",
                            polygon: "928,287,1250,287,1249,412,926,413"
                        },
                        {
                            id: "sub_station_2",
                            polygon: "591,144,604,138,601,126,672,115,748,118,752,136,761,135,762,284,601,283,601,189"
                        }
                    ]
                },
                {
                    id: 8,
                    title: "Wide Ramp",
                    polygons: [
                        {
                            id: "wide_ramp_1",
                            polygon: "292,738,292,473,300,431,314,399,336,368,360,347,393,325,437,309,589,308,591,421,470,421,446,423,427,435,411,454,403,477,402,511,403,741"
                        },
                        {
                            id: "wide_ramp_2",
                            polygon: "70,311,399,308,378,320,355,334,330,354,314,375,300,395,293,410,288,422,69,419"
                        }
                    ]
                },
                {
                    id: 9,
                    title: "Restroom",
                    polygons: [
                        {
                            id: "restroom_1",
                            polygon: "407,510,541,511,542,543,524,545,521,554,496,551,492,573,408,573"
                        }
                    ]
                }
            ]
        }
    }
];