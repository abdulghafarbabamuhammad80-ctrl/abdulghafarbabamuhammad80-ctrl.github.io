// ======================
// TOOL DATABASE
// ======================

const toolData = [

{
name:"Password Generator",
url:"password.html",
keywords:[
"open password generator",
"password generator",
"generate password",
"make password"
]
},

{
name:"QR Code Generator",
url:"qr.html",
keywords:[
"open qr",
"qr generator",
"qr code generator",
"create qr"
]
},

{
name:"Word Counter",
url:"wordcounter.html",
keywords:[
"open word counter",
"word counter",
"count words"
]
},

{
name:"Age Calculator",
url:"age.html",
keywords:[
"open age calculator",
"age calculator",
"calculate age"
]
},

{
name:"Percentage Calculator",
url:"percentage.html",
keywords:[
"open percentage calculator",
"percentage calculator"
]
},

{
name:"Random Number",
url:"random.html",
keywords:[
"random number generator",
"open random number",
"random generator"
]
},

{
name:"Coin Flip",
url:"coin.html",
keywords:[
"coin flip",
"flip coin",
"open coin flip"
]
},

{
name:"Colour Picker",
url:"color.html",
keywords:[
"colour picker",
"color picker",
"pick colour",
"pick color"
]
},

{
name:"Unit Converter",
url:"converter.html",
keywords:[
"unit converter",
"convert units",
"open converter"
]
},

{
name:"Stopwatch & Timer",
url:"stopwatch.html",
keywords:[
"timer",
"stopwatch",
"countdown"
]
},

{
name:"Text Case Converter",
url:"textcase.html",
keywords:[
"text case",
"uppercase converter",
"lowercase converter"
]
},

{
name:"Character Counter",
url:"charactercount.html",
keywords:[
"character counter",
"letter counter"
]
},

{
name:"JSON Formatter",
url:"jsonformatter.html",
keywords:[
"json formatter",
"beautify json",
"format json"
]
},

{
name:"URL Encoder / Decoder",
url:"urltool.html",
keywords:[
"url encoder",
"url decoder",
"encode url",
"decode url"
]
},

{
name:"Image Resizer",
url:"resizer.html",
keywords:[
"open image resizer",
"resize image",
"image resizer"
]
}

];

// ======================
// SMART TOOL MATCHING
// ======================

function findMatchingTool(message){

message = message.toLowerCase().trim();

const openWords=[
"open",
"launch",
"start",
"use",
"go to",
"take me to"
];

const wantsOpen=openWords.some(word=>message.includes(word));

if(!wantsOpen){
return null;
}

for(const tool of toolData){

for(const keyword of tool.keywords){

if(message.includes(keyword)){

return tool;

}

}

}

return null;

}
