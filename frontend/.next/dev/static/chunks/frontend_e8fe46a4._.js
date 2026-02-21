(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/frontend/components/PriceChart.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>PriceChart,
    "generatePriceHistory",
    ()=>generatePriceHistory
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
"use client";
;
function generatePriceHistory(basePrice, volatility, points) {
    const data = [];
    let price = basePrice;
    for(let i = 0; i < points; i++){
        const change = (Math.random() - 0.48) * volatility * basePrice;
        price = Math.max(price + change, basePrice * 0.5);
        data.push(price);
    }
    return data;
}
function PriceChart({ data, color = "#00D632", height = 200 }) {
    if (!data || data.length < 2) return null;
    const min = Math.min(...data);
    const max = Math.max(...data);
    const range = max - min || 1;
    const padding = 4;
    const w = 100;
    const h = 100;
    const points = data.map((val, i)=>{
        const x = padding + i / (data.length - 1) * (w - padding * 2);
        const y = padding + (1 - (val - min) / range) * (h - padding * 2);
        return `${x},${y}`;
    }).join(" ");
    const isDown = data[data.length - 1] < data[0];
    const lineColor = isDown ? "#EF4444" : color;
    // Gradient fill
    const firstPoint = points.split(" ")[0];
    const lastPoint = points.split(" ").pop();
    const fillPoints = `${padding},${h} ${points} ${w - padding},${h}`;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
        viewBox: `0 0 ${w} ${h}`,
        style: {
            height,
            width: "100%"
        },
        preserveAspectRatio: "none",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("defs", {
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("linearGradient", {
                    id: `grad-${lineColor.replace('#', '')}`,
                    x1: "0",
                    x2: "0",
                    y1: "0",
                    y2: "1",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("stop", {
                            offset: "0%",
                            stopColor: lineColor,
                            stopOpacity: "0.15"
                        }, void 0, false, {
                            fileName: "[project]/frontend/components/PriceChart.js",
                            lineNumber: 45,
                            columnNumber: 21
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("stop", {
                            offset: "100%",
                            stopColor: lineColor,
                            stopOpacity: "0"
                        }, void 0, false, {
                            fileName: "[project]/frontend/components/PriceChart.js",
                            lineNumber: 46,
                            columnNumber: 21
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/frontend/components/PriceChart.js",
                    lineNumber: 44,
                    columnNumber: 17
                }, this)
            }, void 0, false, {
                fileName: "[project]/frontend/components/PriceChart.js",
                lineNumber: 43,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("polygon", {
                points: fillPoints,
                fill: `url(#grad-${lineColor.replace('#', '')})`
            }, void 0, false, {
                fileName: "[project]/frontend/components/PriceChart.js",
                lineNumber: 49,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("polyline", {
                points: points,
                fill: "none",
                stroke: lineColor,
                strokeWidth: "0.8",
                strokeLinecap: "round",
                strokeLinejoin: "round"
            }, void 0, false, {
                fileName: "[project]/frontend/components/PriceChart.js",
                lineNumber: 53,
                columnNumber: 13
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/frontend/components/PriceChart.js",
        lineNumber: 42,
        columnNumber: 9
    }, this);
}
_c = PriceChart;
var _c;
__turbopack_context__.k.register(_c, "PriceChart");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/frontend/lib/assets.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * Asset reference data + Alpaca API helpers.
 *
 * Static data (icons, colors, names) stays here.
 * All price / holdings / trading data now comes from
 * the backend via Alpaca.
 */ __turbopack_context__.s([
    "BITCOIN_DATA",
    ()=>BITCOIN_DATA,
    "CRYPTOS",
    ()=>CRYPTOS,
    "STOCKS",
    ()=>STOCKS,
    "getBarParams",
    ()=>getBarParams,
    "getCompanyInfo",
    ()=>getCompanyInfo
]);
const BITCOIN_DATA = {
    symbol: "BTC/USD",
    alpacaSymbol: "BTCUSD",
    name: "Bitcoin",
    icon: "₿",
    color: "#F7931A"
};
const CRYPTOS = [
    {
        symbol: "BTC/USD",
        alpacaSymbol: "BTCUSD",
        name: "Bitcoin",
        icon: "₿",
        color: "#F7931A",
        coingeckoId: "bitcoin",
        logo: "https://assets.coingecko.com/coins/images/1/large/bitcoin.png"
    },
    {
        symbol: "ETH/USD",
        alpacaSymbol: "ETHUSD",
        name: "Ethereum",
        icon: "♦",
        color: "#627EEA",
        coingeckoId: "ethereum",
        logo: "https://assets.coingecko.com/coins/images/279/large/ethereum.png"
    },
    {
        symbol: "LTC/USD",
        alpacaSymbol: "LTCUSD",
        name: "Litecoin",
        icon: "Ł",
        color: "#345D9D",
        coingeckoId: "litecoin",
        logo: "https://assets.coingecko.com/coins/images/2/large/litecoin.png"
    },
    {
        symbol: "BCH/USD",
        alpacaSymbol: "BCHUSD",
        name: "Bitcoin Cash",
        icon: "₿",
        color: "#8DC351",
        coingeckoId: "bitcoin-cash",
        logo: "https://assets.coingecko.com/coins/images/780/large/bitcoin-cash-circle.png"
    },
    {
        symbol: "LINK/USD",
        alpacaSymbol: "LINKUSD",
        name: "Chainlink",
        icon: "🔗",
        color: "#2A5ADA",
        coingeckoId: "chainlink",
        logo: "https://assets.coingecko.com/coins/images/877/large/chainlink-new-logo.png"
    },
    {
        symbol: "UNI/USD",
        alpacaSymbol: "UNIUSD",
        name: "Uniswap",
        icon: "🦄",
        color: "#FF007A",
        coingeckoId: "uniswap",
        logo: "https://assets.coingecko.com/coins/images/12504/large/uni.jpg"
    }
];
const STOCKS = [
    {
        symbol: "AAPL",
        name: "Apple",
        icon: "🍎",
        color: "#555555",
        logo: "https://logo.clearbit.com/apple.com"
    },
    {
        symbol: "MSFT",
        name: "Microsoft",
        icon: "🪟",
        color: "#00A4EF",
        logo: "https://logo.clearbit.com/microsoft.com"
    },
    {
        symbol: "NVDA",
        name: "NVIDIA",
        icon: "🟢",
        color: "#76B900",
        logo: "https://logo.clearbit.com/nvidia.com"
    },
    {
        symbol: "AMZN",
        name: "Amazon",
        icon: "📦",
        color: "#FF9900",
        logo: "https://logo.clearbit.com/amazon.com"
    },
    {
        symbol: "META",
        name: "Meta Platforms",
        icon: "♾️",
        color: "#0080FB",
        logo: "https://logo.clearbit.com/meta.com"
    },
    {
        symbol: "GOOGL",
        name: "Alphabet (Google)",
        icon: "🔍",
        color: "#4285F4",
        logo: "https://logo.clearbit.com/google.com"
    },
    {
        symbol: "TSLA",
        name: "Tesla",
        icon: "⚡",
        color: "#E31937",
        logo: "https://logo.clearbit.com/tesla.com"
    },
    {
        symbol: "BRK.B",
        name: "Berkshire Hathaway",
        icon: "🏢",
        color: "#000000",
        logo: "https://logo.clearbit.com/berkshirehathaway.com"
    },
    {
        symbol: "AVGO",
        name: "Broadcom",
        icon: "🔴",
        color: "#CC0000",
        logo: "https://logo.clearbit.com/broadcom.com"
    },
    {
        symbol: "LLY",
        name: "Eli Lilly",
        icon: "💊",
        color: "#D11920",
        logo: "https://logo.clearbit.com/lilly.com"
    },
    {
        symbol: "V",
        name: "Visa",
        icon: "💳",
        color: "#1A1F71",
        logo: "https://logo.clearbit.com/visa.com"
    },
    {
        symbol: "JPM",
        name: "JPMorgan Chase",
        icon: "🏦",
        color: "#000000",
        logo: "https://logo.clearbit.com/jpmorganchase.com"
    },
    {
        symbol: "UNH",
        name: "UnitedHealth",
        icon: "🩺",
        color: "#003A70",
        logo: "https://logo.clearbit.com/unitedhealthgroup.com"
    },
    {
        symbol: "XOM",
        name: "Exxon Mobil",
        icon: "🛢️",
        color: "#D8232A",
        logo: "https://logo.clearbit.com/exxonmobil.com"
    },
    {
        symbol: "MA",
        name: "Mastercard",
        icon: "💳",
        color: "#EB001B",
        logo: "https://logo.clearbit.com/mastercard.com"
    },
    {
        symbol: "PG",
        name: "Procter & Gamble",
        icon: "🧼",
        color: "#003DA5",
        logo: "https://logo.clearbit.com/pg.com"
    },
    {
        symbol: "JNJ",
        name: "Johnson & Johnson",
        icon: "🩹",
        color: "#C8102E",
        logo: "https://logo.clearbit.com/jnj.com"
    },
    {
        symbol: "HD",
        name: "Home Depot",
        icon: "🔨",
        color: "#F96302",
        logo: "https://logo.clearbit.com/homedepot.com"
    },
    {
        symbol: "MRK",
        name: "Merck",
        icon: "🔬",
        color: "#00A3E0",
        logo: "https://logo.clearbit.com/merck.com"
    },
    {
        symbol: "ABBV",
        name: "AbbVie",
        icon: "🧪",
        color: "#000000",
        logo: "https://logo.clearbit.com/abbvie.com"
    },
    {
        symbol: "CVX",
        name: "Chevron",
        icon: "⛽",
        color: "#0054A4",
        logo: "https://logo.clearbit.com/chevron.com"
    },
    {
        symbol: "CRM",
        name: "Salesforce",
        icon: "☁️",
        color: "#00A1E0",
        logo: "https://logo.clearbit.com/salesforce.com"
    },
    {
        symbol: "AMD",
        name: "AMD",
        icon: "💻",
        color: "#000000",
        logo: "https://logo.clearbit.com/amd.com"
    },
    {
        symbol: "PEP",
        name: "PepsiCo",
        icon: "🥤",
        color: "#004B93",
        logo: "https://logo.clearbit.com/pepsico.com"
    },
    {
        symbol: "KO",
        name: "Coca-Cola",
        icon: "🥤",
        color: "#F40000",
        logo: "https://logo.clearbit.com/coca-cola.com"
    },
    {
        symbol: "BAC",
        name: "Bank of America",
        icon: "🏛️",
        color: "#012169",
        logo: "https://logo.clearbit.com/bankofamerica.com"
    },
    {
        symbol: "TMO",
        name: "Thermo Fisher",
        icon: "🧬",
        color: "#000000",
        logo: "https://logo.clearbit.com/thermofisher.com"
    },
    {
        symbol: "COST",
        name: "Costco",
        icon: "🛒",
        color: "#E31837",
        logo: "https://logo.clearbit.com/costco.com"
    },
    {
        symbol: "WMT",
        name: "Walmart",
        icon: "🏪",
        color: "#0071CE",
        logo: "https://logo.clearbit.com/walmart.com"
    },
    {
        symbol: "MCD",
        name: "McDonald's",
        icon: "🍟",
        color: "#FFC72C",
        logo: "https://logo.clearbit.com/mcdonalds.com"
    },
    {
        symbol: "DIS",
        name: "Disney",
        icon: "🏰",
        color: "#113CCF",
        logo: "https://logo.clearbit.com/disney.com"
    },
    {
        symbol: "ABT",
        name: "Abbott",
        icon: "🏥",
        color: "#0093D0",
        logo: "https://logo.clearbit.com/abbott.com"
    },
    {
        symbol: "CSCO",
        name: "Cisco",
        icon: "🌐",
        color: "#1BA0D7",
        logo: "https://logo.clearbit.com/cisco.com"
    },
    {
        symbol: "INTU",
        name: "Intuit",
        icon: "📊",
        color: "#365EBF",
        logo: "https://logo.clearbit.com/intuit.com"
    },
    {
        symbol: "NFLX",
        name: "Netflix",
        icon: "🍿",
        color: "#E50914",
        logo: "https://logo.clearbit.com/netflix.com"
    },
    {
        symbol: "NKE",
        name: "Nike",
        icon: "👟",
        color: "#000000",
        logo: "https://logo.clearbit.com/nike.com"
    },
    {
        symbol: "IBM",
        name: "IBM",
        icon: "🖥️",
        color: "#0F62FE",
        logo: "https://logo.clearbit.com/ibm.com"
    },
    {
        symbol: "ORCL",
        name: "Oracle",
        icon: "💾",
        color: "#F80000",
        logo: "https://logo.clearbit.com/oracle.com"
    },
    {
        symbol: "CMCSA",
        name: "Comcast",
        icon: "📡",
        color: "#000000",
        logo: "https://logo.clearbit.com/comcast.com"
    },
    {
        symbol: "VZ",
        name: "Verizon",
        icon: "📱",
        color: "#CD040B",
        logo: "https://logo.clearbit.com/verizon.com"
    },
    {
        symbol: "QCOM",
        name: "Qualcomm",
        icon: "📱",
        color: "#3253AD",
        logo: "https://logo.clearbit.com/qualcomm.com"
    },
    {
        symbol: "TXN",
        name: "Texas Instruments",
        icon: "🔌",
        color: "#CC0000",
        logo: "https://logo.clearbit.com/ti.com"
    },
    {
        symbol: "PFE",
        name: "Pfizer",
        icon: "💊",
        color: "#0000FF",
        logo: "https://logo.clearbit.com/pfizer.com"
    },
    {
        symbol: "GE",
        name: "General Electric",
        icon: "⚙️",
        color: "#005EAD",
        logo: "https://logo.clearbit.com/ge.com"
    },
    {
        symbol: "WFC",
        name: "Wells Fargo",
        icon: "💳",
        color: "#CD1409",
        logo: "https://logo.clearbit.com/wellsfargo.com"
    },
    {
        symbol: "NOW",
        name: "ServiceNow",
        icon: "☁️",
        color: "#293E40",
        logo: "https://logo.clearbit.com/servicenow.com"
    },
    {
        symbol: "UNP",
        name: "Union Pacific",
        icon: "🚂",
        color: "#005587",
        logo: "https://logo.clearbit.com/up.com"
    },
    {
        symbol: "BA",
        name: "Boeing",
        icon: "✈️",
        color: "#1D439C",
        logo: "https://logo.clearbit.com/boeing.com"
    },
    {
        symbol: "UPS",
        name: "UPS",
        icon: "📦",
        color: "#351C15",
        logo: "https://logo.clearbit.com/ups.com"
    },
    {
        symbol: "PM",
        name: "Philip Morris",
        icon: "🚬",
        color: "#000000",
        logo: "https://logo.clearbit.com/pmi.com"
    }
];
function getBarParams(range) {
    const now = new Date();
    let start, timeframe, limit;
    switch(range){
        case "1D":
            start = new Date(now);
            start.setDate(now.getDate() - 1);
            timeframe = "15Min";
            limit = 96;
            break;
        case "1W":
            start = new Date(now);
            start.setDate(now.getDate() - 7);
            timeframe = "1Hour";
            limit = 168;
            break;
        case "1M":
            start = new Date(now);
            start.setMonth(now.getMonth() - 1);
            timeframe = "1Day";
            limit = 30;
            break;
        case "1Y":
            start = new Date(now);
            start.setFullYear(now.getFullYear() - 1);
            timeframe = "1Day";
            limit = 365;
            break;
        case "ALL":
            start = new Date(now);
            start.setFullYear(now.getFullYear() - 5);
            timeframe = "1Week";
            limit = 260;
            break;
        default:
            start = new Date(now);
            start.setDate(now.getDate() - 1);
            timeframe = "15Min";
            limit = 96;
    }
    return {
        timeframe,
        start: start.toISOString(),
        limit
    };
}
function getCompanyInfo(symbol, name) {
    const known = {
        AAPL: {
            ceo: "Tim Cook",
            employees: "161,000",
            hq: "Cupertino, CA",
            about: "Apple Inc. designs, manufactures, and markets smartphones, personal computers, tablets, wearables, and accessories worldwide."
        },
        MSFT: {
            ceo: "Satya Nadella",
            employees: "221,000",
            hq: "Redmond, WA",
            about: "Microsoft Corporation develops, licenses, and supports software, services, devices, and solutions worldwide."
        },
        TSLA: {
            ceo: "Elon Musk",
            employees: "127,855",
            hq: "Austin, TX",
            about: "Tesla, Inc. designs, develops, manufactures, leases, and sells electric vehicles, and energy generation and storage systems."
        },
        NVDA: {
            ceo: "Jensen Huang",
            employees: "26,196",
            hq: "Santa Clara, CA",
            about: "NVIDIA Corporation provides graphics, and compute and networking solutions in the United States, Taiwan, China, and internationally."
        },
        AMZN: {
            ceo: "Andy Jassy",
            employees: "1,541,000",
            hq: "Seattle, WA",
            about: "Amazon.com, Inc. engages in the retail sale of consumer products and subscriptions in North America and internationally."
        },
        META: {
            ceo: "Mark Zuckerberg",
            employees: "86,482",
            hq: "Menlo Park, CA",
            about: "Meta Platforms, Inc. engages in the development of products that enable people to connect and share with friends and family."
        },
        GOOGL: {
            ceo: "Sundar Pichai",
            employees: "190,234",
            hq: "Mountain View, CA",
            about: "Alphabet Inc. offers various products and platforms in the United States, Europe, the Middle East, Africa, the Asia-Pacific, Canada, and Latin America."
        }
    };
    if (known[symbol]) return known[symbol];
    // Fallback for the remaining top 50
    return {
        ceo: `CEO of ${name}`,
        employees: `${Math.floor(Math.random() * 100) + 10},000+`,
        hq: "United States",
        about: `${name} is a leading publicly traded company listed on the US stock exchange, providing innovative products and services globally.`
    };
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/frontend/components/PinModal.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>PinModal
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$styled$2d$jsx$2f$style$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/node_modules/styled-jsx/style.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__ = __turbopack_context__.i("[project]/frontend/node_modules/lucide-react/dist/esm/icons/x.js [app-client] (ecmascript) <export default as X>");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$lock$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Lock$3e$__ = __turbopack_context__.i("[project]/frontend/node_modules/lucide-react/dist/esm/icons/lock.js [app-client] (ecmascript) <export default as Lock>");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shield$2d$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ShieldCheck$3e$__ = __turbopack_context__.i("[project]/frontend/node_modules/lucide-react/dist/esm/icons/shield-check.js [app-client] (ecmascript) <export default as ShieldCheck>");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
function PinModal({ isOpen, onSuccess, onClose, userId, title }) {
    _s();
    const [pin, setPin] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([
        "",
        "",
        "",
        ""
    ]);
    const [phase, setPhase] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("enter"); // "enter" | "create" | "confirm"
    const [newPin, setNewPin] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [shake, setShake] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const refs = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])([]);
    const storageKey = `fc_pin_${userId}`;
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "PinModal.useEffect": ()=>{
            if (isOpen) {
                const saved = localStorage.getItem(storageKey);
                setPhase(saved ? "enter" : "create");
                setPin([
                    "",
                    "",
                    "",
                    ""
                ]);
                setNewPin("");
                setError("");
                setTimeout({
                    "PinModal.useEffect": ()=>refs.current[0]?.focus()
                }["PinModal.useEffect"], 100);
            }
        }
    }["PinModal.useEffect"], [
        isOpen,
        storageKey
    ]);
    const handleChange = (index, value)=>{
        if (value.length > 1) value = value.slice(-1);
        if (!/^\d*$/.test(value)) return;
        const next = [
            ...pin
        ];
        next[index] = value;
        setPin(next);
        setError("");
        if (value && index < 3) {
            refs.current[index + 1]?.focus();
        }
        // Auto-submit when 4 digits entered
        if (value && index === 3) {
            const code = next.join("");
            if (code.length === 4) {
                setTimeout(()=>handleSubmit(code), 150);
            }
        }
    };
    const handleKeyDown = (index, e)=>{
        if (e.key === "Backspace" && !pin[index] && index > 0) {
            refs.current[index - 1]?.focus();
        }
    };
    const handleSubmit = (code)=>{
        if (phase === "create") {
            setNewPin(code);
            setPhase("confirm");
            setPin([
                "",
                "",
                "",
                ""
            ]);
            setTimeout(()=>refs.current[0]?.focus(), 100);
            return;
        }
        if (phase === "confirm") {
            if (code === newPin) {
                localStorage.setItem(storageKey, code);
                setPin([
                    "",
                    "",
                    "",
                    ""
                ]);
                onSuccess?.();
            } else {
                triggerError("PINs don't match. Try again.");
                setPhase("create");
                setNewPin("");
            }
            return;
        }
        // phase === "enter"
        const saved = localStorage.getItem(storageKey);
        if (code === saved) {
            setPin([
                "",
                "",
                "",
                ""
            ]);
            onSuccess?.();
        } else {
            triggerError("Wrong PIN. Try again.");
        }
    };
    const triggerError = (msg)=>{
        setError(msg);
        setShake(true);
        setPin([
            "",
            "",
            "",
            ""
        ]);
        setTimeout(()=>{
            setShake(false);
            refs.current[0]?.focus();
        }, 500);
    };
    if (!isOpen) return null;
    const heading = phase === "create" ? "Create a PIN" : phase === "confirm" ? "Confirm your PIN" : title || "Enter PIN";
    const subtitle = phase === "create" ? "Set a 4-digit PIN for transactions" : phase === "confirm" ? "Enter the same PIN again" : "Enter your 4-digit PIN to continue";
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "jsx-5826fc73fba77693" + " " + "fixed inset-0 z-[100] flex items-center justify-center bg-black/70 backdrop-blur-sm",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "jsx-5826fc73fba77693" + " " + "w-full max-w-sm mx-4 bg-white dark:bg-zinc-900 rounded-3xl p-8 shadow-2xl animate-in zoom-in-95 duration-200",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "jsx-5826fc73fba77693" + " " + "flex justify-end -mt-2 -mr-2 mb-2",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: onClose,
                            className: "jsx-5826fc73fba77693" + " " + "p-2 hover:bg-gray-100 dark:hover:bg-zinc-800 rounded-full transition-all",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                                className: "w-5 h-5 text-gray-400"
                            }, void 0, false, {
                                fileName: "[project]/frontend/components/PinModal.js",
                                lineNumber: 128,
                                columnNumber: 25
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/frontend/components/PinModal.js",
                            lineNumber: 127,
                            columnNumber: 21
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/frontend/components/PinModal.js",
                        lineNumber: 126,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "jsx-5826fc73fba77693" + " " + "flex justify-center mb-4",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "jsx-5826fc73fba77693" + " " + "w-16 h-16 bg-cashapp/10 rounded-2xl flex items-center justify-center",
                            children: phase === "create" || phase === "confirm" ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shield$2d$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ShieldCheck$3e$__["ShieldCheck"], {
                                className: "w-8 h-8 text-cashapp"
                            }, void 0, false, {
                                fileName: "[project]/frontend/components/PinModal.js",
                                lineNumber: 136,
                                columnNumber: 29
                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$lock$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Lock$3e$__["Lock"], {
                                className: "w-8 h-8 text-cashapp"
                            }, void 0, false, {
                                fileName: "[project]/frontend/components/PinModal.js",
                                lineNumber: 138,
                                columnNumber: 29
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/frontend/components/PinModal.js",
                            lineNumber: 134,
                            columnNumber: 21
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/frontend/components/PinModal.js",
                        lineNumber: 133,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                        className: "jsx-5826fc73fba77693" + " " + "text-xl font-bold text-center mb-1",
                        children: heading
                    }, void 0, false, {
                        fileName: "[project]/frontend/components/PinModal.js",
                        lineNumber: 143,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "jsx-5826fc73fba77693" + " " + "text-sm text-gray-500 text-center mb-8",
                        children: subtitle
                    }, void 0, false, {
                        fileName: "[project]/frontend/components/PinModal.js",
                        lineNumber: 144,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "jsx-5826fc73fba77693" + " " + `flex justify-center space-x-4 mb-6 ${shake ? 'animate-shake' : ''}`,
                        children: pin.map((digit, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "jsx-5826fc73fba77693" + " " + "relative",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        ref: (el)=>refs.current[i] = el,
                                        type: "password",
                                        inputMode: "numeric",
                                        maxLength: 1,
                                        style: {
                                            borderColor: digit ? 'var(--cashapp-color, #00D632)' : error ? '#EF4444' : 'transparent',
                                            color: 'transparent',
                                            textShadow: '0 0 0 transparent'
                                        },
                                        value: digit,
                                        onChange: (e)=>handleChange(i, e.target.value),
                                        onKeyDown: (e)=>handleKeyDown(i, e),
                                        className: "jsx-5826fc73fba77693" + " " + "w-14 h-14 text-center text-2xl font-bold bg-gray-50 dark:bg-zinc-800 rounded-2xl border-2 outline-none transition-all caret-transparent"
                                    }, void 0, false, {
                                        fileName: "[project]/frontend/components/PinModal.js",
                                        lineNumber: 150,
                                        columnNumber: 29
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "jsx-5826fc73fba77693" + " " + "absolute inset-0 flex items-center justify-center pointer-events-none",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "jsx-5826fc73fba77693" + " " + `w-3.5 h-3.5 rounded-full transition-all ${digit ? 'bg-cashapp scale-100' : 'bg-gray-200 dark:bg-zinc-700 scale-75'}`
                                        }, void 0, false, {
                                            fileName: "[project]/frontend/components/PinModal.js",
                                            lineNumber: 167,
                                            columnNumber: 33
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/frontend/components/PinModal.js",
                                        lineNumber: 166,
                                        columnNumber: 29
                                    }, this)
                                ]
                            }, i, true, {
                                fileName: "[project]/frontend/components/PinModal.js",
                                lineNumber: 149,
                                columnNumber: 25
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/frontend/components/PinModal.js",
                        lineNumber: 147,
                        columnNumber: 17
                    }, this),
                    error && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "jsx-5826fc73fba77693" + " " + "text-red-500 text-sm font-medium text-center mb-4",
                        children: error
                    }, void 0, false, {
                        fileName: "[project]/frontend/components/PinModal.js",
                        lineNumber: 176,
                        columnNumber: 21
                    }, this),
                    phase === "enter" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>{
                            localStorage.removeItem(storageKey);
                            setPhase("create");
                            setPin([
                                "",
                                "",
                                "",
                                ""
                            ]);
                            setError("");
                            setTimeout(()=>refs.current[0]?.focus(), 100);
                        },
                        className: "jsx-5826fc73fba77693" + " " + "block mx-auto text-xs text-cashapp font-bold hover:underline mt-2",
                        children: "Reset PIN"
                    }, void 0, false, {
                        fileName: "[project]/frontend/components/PinModal.js",
                        lineNumber: 181,
                        columnNumber: 21
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/frontend/components/PinModal.js",
                lineNumber: 124,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$styled$2d$jsx$2f$style$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                id: "5826fc73fba77693",
                children: "@keyframes shake{0%,to{transform:translate(0)}20%{transform:translate(-8px)}40%{transform:translate(8px)}60%{transform:translate(-6px)}80%{transform:translate(6px)}}.animate-shake.jsx-5826fc73fba77693{animation:.4s ease-in-out shake}"
            }, void 0, false, void 0, this)
        ]
    }, void 0, true, {
        fileName: "[project]/frontend/components/PinModal.js",
        lineNumber: 123,
        columnNumber: 9
    }, this);
}
_s(PinModal, "1nGPFC0asqIYeT06HQwz7lsCBUM=");
_c = PinModal;
var _c;
__turbopack_context__.k.register(_c, "PinModal");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/frontend/components/Keypad.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Keypad
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$delete$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Delete$3e$__ = __turbopack_context__.i("[project]/frontend/node_modules/lucide-react/dist/esm/icons/delete.js [app-client] (ecmascript) <export default as Delete>");
"use client";
;
;
function Keypad({ amount, setAmount }) {
    const handlePress = (val)=>{
        if (val === ".") {
            if (amount.includes(".")) return;
            setAmount(amount + ".");
        } else {
            // Prevent more than 2 decimal places
            if (amount.includes(".") && amount.split(".")[1].length >= 2) return;
            // Prevent leading zeros
            if (amount === "0") {
                setAmount(val);
            } else {
                setAmount(amount + val);
            }
        }
    };
    const handleDelete = ()=>{
        if (amount.length <= 1) {
            setAmount("0");
        } else {
            setAmount(amount.slice(0, -1));
        }
    };
    const keys = [
        "1",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7",
        "8",
        "9",
        ".",
        "0",
        "delete"
    ];
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "grid grid-cols-3 gap-y-8 gap-x-12 max-w-xs mx-auto mt-8",
        children: keys.map((key)=>{
            if (key === "delete") {
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                    onClick: handleDelete,
                    className: "flex items-center justify-center p-6 text-gray-400 hover:text-white transition-colors",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$delete$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Delete$3e$__["Delete"], {
                        className: "w-8 h-8"
                    }, void 0, false, {
                        fileName: "[project]/frontend/components/Keypad.js",
                        lineNumber: 42,
                        columnNumber: 29
                    }, this)
                }, key, false, {
                    fileName: "[project]/frontend/components/Keypad.js",
                    lineNumber: 37,
                    columnNumber: 25
                }, this);
            }
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                onClick: ()=>handlePress(key),
                className: "text-3xl font-bold p-4 hover:bg-cashapp/10 rounded-full transition-all",
                children: key
            }, key, false, {
                fileName: "[project]/frontend/components/Keypad.js",
                lineNumber: 48,
                columnNumber: 21
            }, this);
        })
    }, void 0, false, {
        fileName: "[project]/frontend/components/Keypad.js",
        lineNumber: 33,
        columnNumber: 9
    }, this);
}
_c = Keypad;
var _c;
__turbopack_context__.k.register(_c, "Keypad");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/frontend/app/crypto/[symbol]/page.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>CryptoDetailPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$context$2f$AuthContext$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/context/AuthContext.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$components$2f$PriceChart$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/components/PriceChart.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$lib$2f$assets$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/lib/assets.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$left$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowLeft$3e$__ = __turbopack_context__.i("[project]/frontend/node_modules/lucide-react/dist/esm/icons/arrow-left.js [app-client] (ecmascript) <export default as ArrowLeft>");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__ = __turbopack_context__.i("[project]/frontend/node_modules/lucide-react/dist/esm/icons/x.js [app-client] (ecmascript) <export default as X>");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle2$3e$__ = __turbopack_context__.i("[project]/frontend/node_modules/lucide-react/dist/esm/icons/circle-check.js [app-client] (ecmascript) <export default as CheckCircle2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__ = __turbopack_context__.i("[project]/frontend/node_modules/lucide-react/dist/esm/icons/loader-circle.js [app-client] (ecmascript) <export default as Loader2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$components$2f$PinModal$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/components/PinModal.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$components$2f$Keypad$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/components/Keypad.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$lib$2f$api$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/lib/api.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
;
;
;
;
const TIME_RANGES = [
    "1D",
    "1W",
    "1M",
    "1Y",
    "ALL"
];
const PRESET_AMOUNTS = [
    1,
    10,
    20,
    50,
    100
];
// Fallback formatter for large numbers
function formatLarge(num) {
    if (!num) return "N/A";
    if (num >= 1e12) return (num / 1e12).toFixed(2) + "T";
    if (num >= 1e9) return (num / 1e9).toFixed(2) + "B";
    if (num >= 1e6) return (num / 1e6).toFixed(2) + "M";
    return num.toLocaleString();
}
function CryptoDetailPage() {
    _s();
    const { user, loading } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$context$2f$AuthContext$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAuth"])();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const params = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useParams"])();
    const decodedSymbol = decodeURIComponent(params.symbol);
    const cryptoInfo = __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$lib$2f$assets$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CRYPTOS"].find((c)=>c.alpacaSymbol === decodedSymbol) || __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$lib$2f$assets$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CRYPTOS"][0];
    const [timeRange, setTimeRange] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("1D");
    const [showBuy, setShowBuy] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [showSell, setShowSell] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [showConfirm, setShowConfirm] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [showKeypad, setShowKeypad] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [amount, setAmount] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [isProcessing, setIsProcessing] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [success, setSuccess] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [orderType, setOrderType] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("buy");
    const [isPinOpen, setIsPinOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    // Send Bitcoin State
    const [showSend, setShowSend] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [sendStep, setSendStep] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(1); // 1=cashtag, 2=amount, 3=confirm
    const [sendCashtag, setSendCashtag] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [sendAmount, setSendAmount] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [sendProcessing, setSendProcessing] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [sendSuccess, setSendSuccess] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [sendError, setSendError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [sendPinOpen, setSendPinOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const isBitcoin = cryptoInfo.alpacaSymbol === "BTCUSD";
    // Live Data State
    const [priceData, setPriceData] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        price: 0,
        change: 0,
        isUp: true
    });
    const [chartData, setChartData] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [position, setPosition] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        qty: 0,
        market_value: 0
    });
    const [cashBalance, setCashBalance] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
    const [dataLoading, setDataLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    // CoinGecko Info State
    const [coinInfo, setCoinInfo] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        marketCap: 0,
        circulatingSupply: 0,
        maxSupply: 0,
        desc: ""
    });
    const [coinLoading, setCoinLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const cryptoHolding = position.qty;
    const cryptoValue = position.market_value;
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "CryptoDetailPage.useEffect": ()=>{
            if (!loading && !user) router.push("/login");
        }
    }["CryptoDetailPage.useEffect"], [
        user,
        loading,
        router
    ]);
    const fetchData = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "CryptoDetailPage.useCallback[fetchData]": async ()=>{
            try {
                // 1. Quote
                const quoteRes = await __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$lib$2f$api$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].get(`/trading/crypto/quote/${cryptoInfo.symbol}`);
                const q = quoteRes.data.data;
                let currentPrice = q.price;
                let openPrice = q.open || q.prevClose;
                if (!currentPrice) currentPrice = 1;
                if (!openPrice) openPrice = 1;
                const diff = currentPrice - openPrice;
                const pctChange = openPrice ? diff / openPrice * 100 : 0;
                setPriceData({
                    price: currentPrice,
                    change: pctChange,
                    isUp: pctChange >= 0
                });
                // 2. Position
                const posRes = await __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$lib$2f$api$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].get(`/trading/positions/${cryptoInfo.alpacaSymbol}`);
                if (posRes.data.success && posRes.data.data) {
                    setPosition(posRes.data.data);
                } else {
                    setPosition({
                        qty: 0,
                        market_value: 0
                    });
                }
                // 3. Cash Balance
                const balRes = await __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$lib$2f$api$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].get("/wallet/balance");
                if (balRes.data.success) {
                    setCashBalance(balRes.data.data.balance / 100);
                }
            } catch (err) {
                console.error(`Failed to fetch ${cryptoInfo.symbol} data:`, err.response?.data || err.message);
            }
        }
    }["CryptoDetailPage.useCallback[fetchData]"], [
        cryptoInfo
    ]);
    const fetchChart = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "CryptoDetailPage.useCallback[fetchChart]": async ()=>{
            try {
                const { timeframe, start, limit } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$lib$2f$assets$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getBarParams"])(timeRange);
                const res = await __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$lib$2f$api$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].get(`/trading/crypto/bars/${cryptoInfo.symbol}`, {
                    params: {
                        timeframe,
                        start,
                        limit
                    }
                });
                const bars = res.data.data.bars || [];
                const formatted = bars.map({
                    "CryptoDetailPage.useCallback[fetchChart].formatted": (b)=>parseFloat(b.c)
                }["CryptoDetailPage.useCallback[fetchChart].formatted"]);
                if (formatted.length > 0) setChartData(formatted);
            } catch (err) {
                console.error(`Failed to fetch ${cryptoInfo.symbol} chart:`, err.response?.data || err.message);
            }
        }
    }["CryptoDetailPage.useCallback[fetchChart]"], [
        timeRange,
        cryptoInfo
    ]);
    const fetchCoinGecko = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "CryptoDetailPage.useCallback[fetchCoinGecko]": async ()=>{
            if (!cryptoInfo.coingeckoId) {
                setCoinLoading(false);
                return;
            }
            setCoinLoading(true);
            try {
                const res = await fetch(`https://api.coingecko.com/api/v3/coins/${cryptoInfo.coingeckoId}?localization=false&tickers=false&market_data=true&community_data=false&developer_data=false&sparkline=false`);
                const data = await res.json();
                setCoinInfo({
                    marketCap: data.market_data?.market_cap?.usd || 0,
                    circulatingSupply: data.market_data?.circulating_supply || 0,
                    maxSupply: data.market_data?.max_supply || data.market_data?.total_supply || 0,
                    desc: data.description?.en ? data.description.en.split(". ")[0] + "." : `${cryptoInfo.name} is a decentralized cryptocurrency.`
                });
            } catch (err) {
                console.error("CoinGecko fetch failed:", err);
                setCoinInfo({
                    marketCap: 0,
                    circulatingSupply: 0,
                    maxSupply: 0,
                    desc: `${cryptoInfo.name} is a cryptocurrency.`
                });
            }
            setCoinLoading(false);
        }
    }["CryptoDetailPage.useCallback[fetchCoinGecko]"], [
        cryptoInfo
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "CryptoDetailPage.useEffect": ()=>{
            if (!user) return;
            setDataLoading(true);
            Promise.all([
                fetchData(),
                fetchChart()
            ]).finally({
                "CryptoDetailPage.useEffect": ()=>setDataLoading(false)
            }["CryptoDetailPage.useEffect"]);
        }
    }["CryptoDetailPage.useEffect"], [
        user,
        timeRange,
        fetchData,
        fetchChart
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "CryptoDetailPage.useEffect": ()=>{
            fetchCoinGecko();
        }
    }["CryptoDetailPage.useEffect"], [
        fetchCoinGecko
    ]);
    const [orderStatusMsg, setOrderStatusMsg] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("Filled");
    const handleConfirm = async ()=>{
        const amt = parseFloat(amount);
        if (!amt || amt <= 0) return;
        setIsProcessing(true);
        try {
            const res = await __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$lib$2f$api$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].post("/trading/order", {
                symbol: cryptoInfo.symbol,
                notional: amt,
                side: orderType
            });
            const orderStatus = res.data.data?.status;
            await fetchData();
            setIsProcessing(false);
            setOrderStatusMsg(orderStatus === "accepted" || orderStatus === "new" ? "Queued (Market Closed)" : "Filled");
            setSuccess(true);
            setTimeout(()=>{
                setSuccess(false);
                setShowConfirm(false);
                setShowBuy(false);
                setShowSell(false);
                setAmount("");
            }, 1800);
        } catch (err) {
            setIsProcessing(false);
            alert("Order failed: " + (err.response?.data?.message || err.message));
            setShowConfirm(false);
        }
    };
    const openBuy = ()=>{
        setOrderType("buy");
        setAmount("");
        setShowBuy(true);
        setShowKeypad(false);
    };
    const openSell = ()=>{
        setOrderType("sell");
        setAmount("");
        setShowSell(true);
        setShowKeypad(false);
    };
    const goToConfirm = ()=>{
        const amt = parseFloat(amount);
        if (amt && amt > 0) {
            setShowBuy(false);
            setShowSell(false);
            setShowConfirm(true);
        }
    };
    if (loading || !user) return null;
    const amt = parseFloat(amount) || 0;
    const cryptoQty = priceData.price ? amt / priceData.price : 0;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "min-h-screen bg-white dark:bg-black pb-24",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center justify-between p-6",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>router.back(),
                        className: "p-2 hover:bg-gray-100 dark:hover:bg-zinc-800 rounded-full transition-all",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$left$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowLeft$3e$__["ArrowLeft"], {
                            className: "w-6 h-6"
                        }, void 0, false, {
                            fileName: "[project]/frontend/app/crypto/[symbol]/page.js",
                            lineNumber: 265,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/frontend/app/crypto/[symbol]/page.js",
                        lineNumber: 261,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "w-10"
                    }, void 0, false, {
                        fileName: "[project]/frontend/app/crypto/[symbol]/page.js",
                        lineNumber: 267,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/frontend/app/crypto/[symbol]/page.js",
                lineNumber: 260,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "px-6",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center justify-between mb-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center space-x-4",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "w-14 h-14 rounded-full flex items-center justify-center text-white text-2xl font-bold shadow-lg",
                                        style: {
                                            backgroundColor: cryptoInfo.color,
                                            shadowColor: cryptoInfo.color + "40"
                                        },
                                        children: cryptoInfo.icon
                                    }, void 0, false, {
                                        fileName: "[project]/frontend/app/crypto/[symbol]/page.js",
                                        lineNumber: 274,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                                className: "text-2xl font-bold",
                                                children: cryptoInfo.name
                                            }, void 0, false, {
                                                fileName: "[project]/frontend/app/crypto/[symbol]/page.js",
                                                lineNumber: 284,
                                                columnNumber: 15
                                            }, this),
                                            dataLoading ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "h-4 w-16 bg-gray-200 dark:bg-zinc-800 animate-pulse rounded mt-1"
                                            }, void 0, false, {
                                                fileName: "[project]/frontend/app/crypto/[symbol]/page.js",
                                                lineNumber: 286,
                                                columnNumber: 17
                                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: `text-sm font-bold ${priceData.isUp ? "text-cashapp" : "text-red-500"}`,
                                                children: [
                                                    priceData.isUp ? "↑" : "↓",
                                                    " ",
                                                    Math.abs(priceData.change).toFixed(2),
                                                    "%"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/frontend/app/crypto/[symbol]/page.js",
                                                lineNumber: 288,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/frontend/app/crypto/[symbol]/page.js",
                                        lineNumber: 283,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/frontend/app/crypto/[symbol]/page.js",
                                lineNumber: 273,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "bg-gray-100 dark:bg-zinc-800 px-4 py-2 rounded-full",
                                children: dataLoading ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "h-6 w-20 bg-gray-200 dark:bg-zinc-700 animate-pulse rounded"
                                }, void 0, false, {
                                    fileName: "[project]/frontend/app/crypto/[symbol]/page.js",
                                    lineNumber: 299,
                                    columnNumber: 15
                                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-lg font-bold",
                                    children: [
                                        "$",
                                        priceData.price.toLocaleString(undefined, {
                                            minimumFractionDigits: 2,
                                            maximumFractionDigits: 5
                                        })
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/frontend/app/crypto/[symbol]/page.js",
                                    lineNumber: 301,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/frontend/app/crypto/[symbol]/page.js",
                                lineNumber: 297,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/frontend/app/crypto/[symbol]/page.js",
                        lineNumber: 272,
                        columnNumber: 9
                    }, this),
                    cryptoHolding > 0 && !dataLoading && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mt-4 p-4 bg-gray-50 dark:bg-zinc-900 rounded-2xl border border-gray-100 dark:border-zinc-800",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-xs text-gray-500 font-bold uppercase tracking-widest",
                                children: [
                                    "Your ",
                                    cryptoInfo.name
                                ]
                            }, void 0, true, {
                                fileName: "[project]/frontend/app/crypto/[symbol]/page.js",
                                lineNumber: 315,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-xl font-bold mt-1",
                                children: [
                                    cryptoHolding.toFixed(8),
                                    " ",
                                    cryptoInfo.alpacaSymbol.split("/")[0]
                                ]
                            }, void 0, true, {
                                fileName: "[project]/frontend/app/crypto/[symbol]/page.js",
                                lineNumber: 318,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-sm text-gray-500",
                                children: [
                                    "≈ $",
                                    cryptoValue.toFixed(2)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/frontend/app/crypto/[symbol]/page.js",
                                lineNumber: 322,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/frontend/app/crypto/[symbol]/page.js",
                        lineNumber: 314,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/frontend/app/crypto/[symbol]/page.js",
                lineNumber: 271,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "px-2 mt-6 relative",
                children: dataLoading && chartData.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "h-[220px] flex items-center justify-center",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__["Loader2"], {
                        className: "w-8 h-8 animate-spin text-gray-300"
                    }, void 0, false, {
                        fileName: "[project]/frontend/app/crypto/[symbol]/page.js",
                        lineNumber: 331,
                        columnNumber: 13
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/frontend/app/crypto/[symbol]/page.js",
                    lineNumber: 330,
                    columnNumber: 11
                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$components$2f$PriceChart$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                    data: chartData,
                    color: cryptoInfo.color,
                    height: 220
                }, void 0, false, {
                    fileName: "[project]/frontend/app/crypto/[symbol]/page.js",
                    lineNumber: 334,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/frontend/app/crypto/[symbol]/page.js",
                lineNumber: 328,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex justify-center space-x-2 px-6 mt-4 mb-8",
                children: TIME_RANGES.map((t)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>setTimeRange(t),
                        className: `px-4 py-2 rounded-full text-sm font-bold transition-all ${timeRange === t ? "bg-black dark:bg-white text-white dark:text-black" : "text-gray-400 hover:text-gray-600"}`,
                        children: t
                    }, t, false, {
                        fileName: "[project]/frontend/app/crypto/[symbol]/page.js",
                        lineNumber: 341,
                        columnNumber: 11
                    }, this))
            }, void 0, false, {
                fileName: "[project]/frontend/app/crypto/[symbol]/page.js",
                lineNumber: 339,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "px-6 mb-32",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                        className: "text-xl font-bold mb-4",
                        children: [
                            "About ",
                            cryptoInfo.name
                        ]
                    }, void 0, true, {
                        fileName: "[project]/frontend/app/crypto/[symbol]/page.js",
                        lineNumber: 356,
                        columnNumber: 9
                    }, this),
                    coinLoading ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex justify-center py-6",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__["Loader2"], {
                            className: "w-6 h-6 animate-spin text-gray-300"
                        }, void 0, false, {
                            fileName: "[project]/frontend/app/crypto/[symbol]/page.js",
                            lineNumber: 359,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/frontend/app/crypto/[symbol]/page.js",
                        lineNumber: 358,
                        columnNumber: 11
                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "space-y-1",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex justify-between items-center py-3 border-b border-gray-100 dark:border-zinc-800/50",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-gray-500 font-medium tracking-tight",
                                                children: "Market Cap"
                                            }, void 0, false, {
                                                fileName: "[project]/frontend/app/crypto/[symbol]/page.js",
                                                lineNumber: 365,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "font-bold",
                                                children: [
                                                    "$",
                                                    formatLarge(coinInfo.marketCap)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/frontend/app/crypto/[symbol]/page.js",
                                                lineNumber: 368,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/frontend/app/crypto/[symbol]/page.js",
                                        lineNumber: 364,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex justify-between items-center py-3 border-b border-gray-100 dark:border-zinc-800/50",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-gray-500 font-medium tracking-tight",
                                                children: "Circulating Supply"
                                            }, void 0, false, {
                                                fileName: "[project]/frontend/app/crypto/[symbol]/page.js",
                                                lineNumber: 373,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "font-bold",
                                                children: [
                                                    formatLarge(coinInfo.circulatingSupply),
                                                    " ",
                                                    cryptoInfo.alpacaSymbol.split("/")[0]
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/frontend/app/crypto/[symbol]/page.js",
                                                lineNumber: 376,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/frontend/app/crypto/[symbol]/page.js",
                                        lineNumber: 372,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex justify-between items-center py-3",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-gray-500 font-medium tracking-tight",
                                                children: "Max Supply"
                                            }, void 0, false, {
                                                fileName: "[project]/frontend/app/crypto/[symbol]/page.js",
                                                lineNumber: 382,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "font-bold",
                                                children: [
                                                    formatLarge(coinInfo.maxSupply) === "0" ? "Unlimited" : formatLarge(coinInfo.maxSupply),
                                                    " ",
                                                    formatLarge(coinInfo.maxSupply) === "0" ? "" : cryptoInfo.alpacaSymbol.split("/")[0]
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/frontend/app/crypto/[symbol]/page.js",
                                                lineNumber: 385,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/frontend/app/crypto/[symbol]/page.js",
                                        lineNumber: 381,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/frontend/app/crypto/[symbol]/page.js",
                                lineNumber: 363,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-sm text-gray-400 mt-4 leading-relaxed font-medium",
                                dangerouslySetInnerHTML: {
                                    __html: coinInfo.desc
                                }
                            }, void 0, false, {
                                fileName: "[project]/frontend/app/crypto/[symbol]/page.js",
                                lineNumber: 396,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true)
                ]
            }, void 0, true, {
                fileName: "[project]/frontend/app/crypto/[symbol]/page.js",
                lineNumber: 355,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "fixed bottom-0 left-0 right-0 max-w-md mx-auto p-6 bg-white/80 dark:bg-black/80 backdrop-blur-md border-t border-gray-100 dark:border-zinc-800",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex space-x-3",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: openBuy,
                            className: "flex-1 bg-black dark:bg-white text-white dark:text-black font-bold py-4 rounded-full text-lg hover:scale-[1.02] active:scale-95 transition-all",
                            children: "Buy"
                        }, void 0, false, {
                            fileName: "[project]/frontend/app/crypto/[symbol]/page.js",
                            lineNumber: 407,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: openSell,
                            disabled: cryptoHolding <= 0,
                            className: "flex-1 bg-gray-100 dark:bg-zinc-800 disabled:opacity-50 font-bold py-4 rounded-full text-lg hover:scale-[1.02] active:scale-95 transition-all",
                            children: "Sell"
                        }, void 0, false, {
                            fileName: "[project]/frontend/app/crypto/[symbol]/page.js",
                            lineNumber: 413,
                            columnNumber: 11
                        }, this),
                        isBitcoin && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: ()=>{
                                setShowSend(true);
                                setSendStep(1);
                                setSendCashtag("");
                                setSendAmount("");
                                setSendError("");
                                setSendSuccess(false);
                            },
                            className: "flex-1 bg-[#F7931A] text-white font-bold py-4 rounded-full text-lg hover:scale-[1.02] active:scale-95 transition-all",
                            children: "Send"
                        }, void 0, false, {
                            fileName: "[project]/frontend/app/crypto/[symbol]/page.js",
                            lineNumber: 421,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/frontend/app/crypto/[symbol]/page.js",
                    lineNumber: 406,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/frontend/app/crypto/[symbol]/page.js",
                lineNumber: 405,
                columnNumber: 7
            }, this),
            (showBuy || showSell) && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "fixed inset-0 z-50 flex items-end justify-center bg-black/50",
                onClick: ()=>{
                    setShowBuy(false);
                    setShowSell(false);
                },
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "w-full max-w-md bg-white dark:bg-zinc-900 rounded-t-3xl p-6 animate-in slide-in-from-bottom duration-300",
                    onClick: (e)=>e.stopPropagation(),
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex justify-center mb-4",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "w-12 h-1.5 bg-gray-200 dark:bg-zinc-700 rounded-full"
                            }, void 0, false, {
                                fileName: "[project]/frontend/app/crypto/[symbol]/page.js",
                                lineNumber: 452,
                                columnNumber: 15
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/frontend/app/crypto/[symbol]/page.js",
                            lineNumber: 451,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                            className: "text-xl font-bold text-center mb-1",
                            children: [
                                orderType === "buy" ? "Buy" : "Sell",
                                " ",
                                cryptoInfo.name
                            ]
                        }, void 0, true, {
                            fileName: "[project]/frontend/app/crypto/[symbol]/page.js",
                            lineNumber: 454,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex justify-center mb-2",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-gray-500 font-medium text-sm",
                                children: [
                                    "$",
                                    orderType === "buy" ? cashBalance.toLocaleString() : cryptoValue.toLocaleString(undefined, {
                                        minimumFractionDigits: 2,
                                        maximumFractionDigits: 2
                                    }),
                                    " ",
                                    "Available"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/frontend/app/crypto/[symbol]/page.js",
                                lineNumber: 458,
                                columnNumber: 15
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/frontend/app/crypto/[symbol]/page.js",
                            lineNumber: 457,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex justify-center mb-6 mt-4",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "px-4 py-1.5 bg-gray-100 dark:bg-zinc-800 rounded-full text-sm font-medium",
                                children: "One-Time Purchase ▾"
                            }, void 0, false, {
                                fileName: "[project]/frontend/app/crypto/[symbol]/page.js",
                                lineNumber: 470,
                                columnNumber: 15
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/frontend/app/crypto/[symbol]/page.js",
                            lineNumber: 469,
                            columnNumber: 13
                        }, this),
                        showKeypad ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "animate-in fade-in duration-200",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "text-center text-4xl font-bold mb-6 mt-4",
                                    children: [
                                        "$",
                                        amount || "0"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/frontend/app/crypto/[symbol]/page.js",
                                    lineNumber: 477,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$components$2f$Keypad$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                    amount: amount,
                                    setAmount: setAmount
                                }, void 0, false, {
                                    fileName: "[project]/frontend/app/crypto/[symbol]/page.js",
                                    lineNumber: 480,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: ()=>setShowKeypad(false),
                                    className: "w-full mt-6 py-4 text-gray-500 font-bold hover:bg-gray-50 dark:hover:bg-zinc-800 rounded-full transition-all",
                                    children: "Cancel Custom Amount"
                                }, void 0, false, {
                                    fileName: "[project]/frontend/app/crypto/[symbol]/page.js",
                                    lineNumber: 481,
                                    columnNumber: 17
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/frontend/app/crypto/[symbol]/page.js",
                            lineNumber: 476,
                            columnNumber: 15
                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "grid grid-cols-3 gap-3 mb-6",
                                children: [
                                    PRESET_AMOUNTS.map((a)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: ()=>setAmount(String(a)),
                                            className: `py-4 rounded-2xl font-bold text-lg transition-all border ${amount === String(a) ? "border-black dark:border-white bg-gray-50 dark:bg-zinc-800" : "border-gray-200 dark:border-zinc-700 hover:border-gray-400"}`,
                                            children: [
                                                "$",
                                                a
                                            ]
                                        }, a, true, {
                                            fileName: "[project]/frontend/app/crypto/[symbol]/page.js",
                                            lineNumber: 492,
                                            columnNumber: 21
                                        }, this)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>{
                                            setShowKeypad(true);
                                            setAmount("");
                                        },
                                        className: `py-4 rounded-2xl font-bold text-lg transition-all border ${amount && !PRESET_AMOUNTS.includes(Number(amount)) ? "border-black dark:border-white bg-gray-50 dark:bg-zinc-800" : "border-gray-200 dark:border-zinc-700 hover:border-gray-400"}`,
                                        children: amount && !PRESET_AMOUNTS.includes(Number(amount)) ? `$${amount}` : "..."
                                    }, void 0, false, {
                                        fileName: "[project]/frontend/app/crypto/[symbol]/page.js",
                                        lineNumber: 500,
                                        columnNumber: 19
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/frontend/app/crypto/[symbol]/page.js",
                                lineNumber: 490,
                                columnNumber: 17
                            }, this)
                        }, void 0, false),
                        orderType === "buy" && (!amount || parseFloat(amount) > cashBalance) && amount !== "" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-red-500 text-sm text-center mt-4 mb-2 font-medium",
                            children: [
                                "Amount exceeds your cash balance ($",
                                cashBalance.toLocaleString(),
                                ")"
                            ]
                        }, void 0, true, {
                            fileName: "[project]/frontend/app/crypto/[symbol]/page.js",
                            lineNumber: 518,
                            columnNumber: 17
                        }, this),
                        orderType === "sell" && (!amount || parseFloat(amount) > cryptoValue) && amount !== "" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-red-500 text-sm text-center mt-4 mb-2 font-medium",
                            children: [
                                "Amount exceeds your ",
                                cryptoInfo.name,
                                " balance ($",
                                cryptoValue.toFixed(2),
                                ")"
                            ]
                        }, void 0, true, {
                            fileName: "[project]/frontend/app/crypto/[symbol]/page.js",
                            lineNumber: 526,
                            columnNumber: 17
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: goToConfirm,
                            disabled: !amount || parseFloat(amount) <= 0 || orderType === "sell" && parseFloat(amount) > cryptoValue || orderType === "buy" && parseFloat(amount) > cashBalance,
                            className: `w-full mt-4 bg-cashapp text-white font-bold py-4 rounded-full text-lg shadow-lg disabled:opacity-30 disabled:shadow-none hover:scale-[1.02] active:scale-95 transition-all ${showKeypad ? "" : ""}`,
                            children: "Next"
                        }, void 0, false, {
                            fileName: "[project]/frontend/app/crypto/[symbol]/page.js",
                            lineNumber: 531,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/frontend/app/crypto/[symbol]/page.js",
                    lineNumber: 447,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/frontend/app/crypto/[symbol]/page.js",
                lineNumber: 440,
                columnNumber: 9
            }, this),
            showConfirm && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "fixed inset-0 z-50 flex flex-col bg-white dark:bg-black",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex justify-end p-6",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: ()=>{
                                setShowConfirm(false);
                                setAmount("");
                            },
                            className: "p-2 hover:bg-gray-100 dark:hover:bg-zinc-800 rounded-full transition-all",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                                className: "w-6 h-6"
                            }, void 0, false, {
                                fileName: "[project]/frontend/app/crypto/[symbol]/page.js",
                                lineNumber: 558,
                                columnNumber: 15
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/frontend/app/crypto/[symbol]/page.js",
                            lineNumber: 551,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/frontend/app/crypto/[symbol]/page.js",
                        lineNumber: 550,
                        columnNumber: 11
                    }, this),
                    success ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex-1 flex flex-col items-center justify-center",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle2$3e$__["CheckCircle2"], {
                                className: "w-20 h-20 text-cashapp mb-4 animate-bounce"
                            }, void 0, false, {
                                fileName: "[project]/frontend/app/crypto/[symbol]/page.js",
                                lineNumber: 563,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                className: "text-2xl font-bold",
                                children: "Order Placed!"
                            }, void 0, false, {
                                fileName: "[project]/frontend/app/crypto/[symbol]/page.js",
                                lineNumber: 564,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-gray-500 mt-2 font-medium",
                                children: [
                                    orderStatusMsg,
                                    " • ",
                                    orderType === "buy" ? "Bought" : "Sold",
                                    " $",
                                    amt.toFixed(2),
                                    " of ",
                                    cryptoInfo.name
                                ]
                            }, void 0, true, {
                                fileName: "[project]/frontend/app/crypto/[symbol]/page.js",
                                lineNumber: 565,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>router.push("/crypto"),
                                className: "mt-8 text-black dark:text-white font-bold underline",
                                children: "Back to Crypto"
                            }, void 0, false, {
                                fileName: "[project]/frontend/app/crypto/[symbol]/page.js",
                                lineNumber: 569,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/frontend/app/crypto/[symbol]/page.js",
                        lineNumber: 562,
                        columnNumber: 13
                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex-1 flex flex-col justify-between px-8 pb-8",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                        className: "text-3xl font-bold mb-10",
                                        children: [
                                            orderType === "buy" ? "Buy" : "Sell",
                                            " $",
                                            amt.toFixed(2),
                                            " of",
                                            " ",
                                            cryptoInfo.name
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/frontend/app/crypto/[symbol]/page.js",
                                        lineNumber: 579,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "space-y-4",
                                        children: [
                                            [
                                                {
                                                    label: "Funding Source",
                                                    value: "FlowCash"
                                                },
                                                {
                                                    label: "Order Type",
                                                    value: "Market"
                                                },
                                                {
                                                    label: "Approx Price",
                                                    value: `$${priceData.price.toLocaleString(undefined, {
                                                        minimumFractionDigits: 2,
                                                        maximumFractionDigits: 5
                                                    })}`
                                                },
                                                {
                                                    label: "Approx Amount",
                                                    value: `${cryptoQty.toFixed(8)} ${cryptoInfo.alpacaSymbol.split("/")[0]}`
                                                },
                                                {
                                                    label: "Symbol",
                                                    value: cryptoInfo.alpacaSymbol.split("/")[0]
                                                }
                                            ].map((row)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex justify-between py-2",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "text-gray-500",
                                                            children: row.label
                                                        }, void 0, false, {
                                                            fileName: "[project]/frontend/app/crypto/[symbol]/page.js",
                                                            lineNumber: 601,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "font-bold",
                                                            children: row.value
                                                        }, void 0, false, {
                                                            fileName: "[project]/frontend/app/crypto/[symbol]/page.js",
                                                            lineNumber: 602,
                                                            columnNumber: 23
                                                        }, this)
                                                    ]
                                                }, row.label, true, {
                                                    fileName: "[project]/frontend/app/crypto/[symbol]/page.js",
                                                    lineNumber: 600,
                                                    columnNumber: 21
                                                }, this)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "border-t border-gray-100 dark:border-zinc-800 pt-4 mt-4 space-y-3",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex justify-between",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "text-gray-500",
                                                                children: "Total Amount"
                                                            }, void 0, false, {
                                                                fileName: "[project]/frontend/app/crypto/[symbol]/page.js",
                                                                lineNumber: 607,
                                                                columnNumber: 23
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "font-bold",
                                                                children: [
                                                                    "$",
                                                                    amt.toFixed(2)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/frontend/app/crypto/[symbol]/page.js",
                                                                lineNumber: 608,
                                                                columnNumber: 23
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/frontend/app/crypto/[symbol]/page.js",
                                                        lineNumber: 606,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex justify-between",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "text-gray-500",
                                                                children: "Fees"
                                                            }, void 0, false, {
                                                                fileName: "[project]/frontend/app/crypto/[symbol]/page.js",
                                                                lineNumber: 611,
                                                                columnNumber: 23
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "font-bold",
                                                                children: "$0.00"
                                                            }, void 0, false, {
                                                                fileName: "[project]/frontend/app/crypto/[symbol]/page.js",
                                                                lineNumber: 612,
                                                                columnNumber: 23
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/frontend/app/crypto/[symbol]/page.js",
                                                        lineNumber: 610,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex justify-between",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "text-gray-500 font-bold",
                                                                children: "Total Cost"
                                                            }, void 0, false, {
                                                                fileName: "[project]/frontend/app/crypto/[symbol]/page.js",
                                                                lineNumber: 615,
                                                                columnNumber: 23
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "font-bold text-lg",
                                                                children: [
                                                                    "$",
                                                                    amt.toFixed(2)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/frontend/app/crypto/[symbol]/page.js",
                                                                lineNumber: 618,
                                                                columnNumber: 23
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/frontend/app/crypto/[symbol]/page.js",
                                                        lineNumber: 614,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/frontend/app/crypto/[symbol]/page.js",
                                                lineNumber: 605,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/frontend/app/crypto/[symbol]/page.js",
                                        lineNumber: 583,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/frontend/app/crypto/[symbol]/page.js",
                                lineNumber: 578,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>setIsPinOpen(true),
                                disabled: isProcessing,
                                className: "w-full bg-black dark:bg-white text-white dark:text-black font-bold py-5 rounded-full text-lg hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-50",
                                children: isProcessing ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__["Loader2"], {
                                    className: "w-6 h-6 animate-spin mx-auto"
                                }, void 0, false, {
                                    fileName: "[project]/frontend/app/crypto/[symbol]/page.js",
                                    lineNumber: 631,
                                    columnNumber: 19
                                }, this) : "Confirm"
                            }, void 0, false, {
                                fileName: "[project]/frontend/app/crypto/[symbol]/page.js",
                                lineNumber: 625,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/frontend/app/crypto/[symbol]/page.js",
                        lineNumber: 577,
                        columnNumber: 13
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/frontend/app/crypto/[symbol]/page.js",
                lineNumber: 549,
                columnNumber: 9
            }, this),
            showSend && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "fixed inset-0 z-50 flex items-end justify-center bg-black/50",
                onClick: ()=>setShowSend(false),
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "w-full max-w-md bg-white dark:bg-zinc-900 rounded-t-3xl p-6 animate-in slide-in-from-bottom duration-300 max-h-[90vh] overflow-y-auto",
                    onClick: (e)=>e.stopPropagation(),
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex justify-center mb-4",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "w-12 h-1.5 bg-gray-200 dark:bg-zinc-700 rounded-full"
                            }, void 0, false, {
                                fileName: "[project]/frontend/app/crypto/[symbol]/page.js",
                                lineNumber: 652,
                                columnNumber: 15
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/frontend/app/crypto/[symbol]/page.js",
                            lineNumber: 651,
                            columnNumber: 13
                        }, this),
                        sendSuccess ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex flex-col items-center py-12",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "w-20 h-20 bg-[#F7931A]/10 rounded-full flex items-center justify-center mb-6",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle2$3e$__["CheckCircle2"], {
                                        className: "w-12 h-12 text-[#F7931A]"
                                    }, void 0, false, {
                                        fileName: "[project]/frontend/app/crypto/[symbol]/page.js",
                                        lineNumber: 658,
                                        columnNumber: 19
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/frontend/app/crypto/[symbol]/page.js",
                                    lineNumber: 657,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                    className: "text-xl font-bold mb-2",
                                    children: "Bitcoin Sent! 🎉"
                                }, void 0, false, {
                                    fileName: "[project]/frontend/app/crypto/[symbol]/page.js",
                                    lineNumber: 660,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-gray-500 text-center mb-2",
                                    children: [
                                        "$",
                                        parseFloat(sendAmount).toFixed(2),
                                        " in BTC sent to",
                                        " ",
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-[#F7931A] font-bold",
                                            children: sendCashtag
                                        }, void 0, false, {
                                            fileName: "[project]/frontend/app/crypto/[symbol]/page.js",
                                            lineNumber: 663,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/frontend/app/crypto/[symbol]/page.js",
                                    lineNumber: 661,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-xs text-gray-400 mb-8",
                                    children: [
                                        "≈ ",
                                        (parseFloat(sendAmount) / priceData.price).toFixed(8),
                                        " BTC"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/frontend/app/crypto/[symbol]/page.js",
                                    lineNumber: 667,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: ()=>{
                                        setShowSend(false);
                                        fetchData();
                                    },
                                    className: "w-full bg-[#F7931A] text-white font-bold py-4 rounded-full",
                                    children: "Done"
                                }, void 0, false, {
                                    fileName: "[project]/frontend/app/crypto/[symbol]/page.js",
                                    lineNumber: 670,
                                    columnNumber: 17
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/frontend/app/crypto/[symbol]/page.js",
                            lineNumber: 656,
                            columnNumber: 15
                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                    className: "text-xl font-bold text-center mb-1",
                                    children: "Send Bitcoin"
                                }, void 0, false, {
                                    fileName: "[project]/frontend/app/crypto/[symbol]/page.js",
                                    lineNumber: 682,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-center text-gray-500 text-sm mb-6",
                                    children: sendStep === 1 ? "Who are you sending to?" : sendStep === 2 ? "How much?" : "Confirm details"
                                }, void 0, false, {
                                    fileName: "[project]/frontend/app/crypto/[symbol]/page.js",
                                    lineNumber: 685,
                                    columnNumber: 17
                                }, this),
                                sendError && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 p-3 rounded-xl text-sm font-medium mb-4 text-center",
                                    children: sendError
                                }, void 0, false, {
                                    fileName: "[project]/frontend/app/crypto/[symbol]/page.js",
                                    lineNumber: 694,
                                    columnNumber: 19
                                }, this),
                                sendStep === 1 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "space-y-4",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex items-center space-x-3 bg-gray-50 dark:bg-zinc-800 rounded-2xl p-4",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-[#F7931A] font-bold text-lg",
                                                    children: "$"
                                                }, void 0, false, {
                                                    fileName: "[project]/frontend/app/crypto/[symbol]/page.js",
                                                    lineNumber: 703,
                                                    columnNumber: 23
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                    type: "text",
                                                    autoFocus: true,
                                                    placeholder: "Enter $Cashtag",
                                                    className: "bg-transparent text-lg font-bold outline-none w-full",
                                                    value: sendCashtag,
                                                    onChange: (e)=>{
                                                        setSendCashtag(e.target.value);
                                                        setSendError("");
                                                    }
                                                }, void 0, false, {
                                                    fileName: "[project]/frontend/app/crypto/[symbol]/page.js",
                                                    lineNumber: 706,
                                                    columnNumber: 23
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/frontend/app/crypto/[symbol]/page.js",
                                            lineNumber: 702,
                                            columnNumber: 21
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            disabled: !sendCashtag.trim(),
                                            onClick: ()=>{
                                                setSendError("");
                                                setSendStep(2);
                                            },
                                            className: "w-full bg-[#F7931A] text-white font-bold py-4 rounded-full disabled:opacity-30 hover:scale-[1.02] active:scale-95 transition-all",
                                            children: "Next"
                                        }, void 0, false, {
                                            fileName: "[project]/frontend/app/crypto/[symbol]/page.js",
                                            lineNumber: 718,
                                            columnNumber: 21
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/frontend/app/crypto/[symbol]/page.js",
                                    lineNumber: 701,
                                    columnNumber: 19
                                }, this),
                                sendStep === 2 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "space-y-4",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex items-center space-x-3 bg-gray-50 dark:bg-zinc-800 rounded-2xl p-4",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-[#F7931A] font-bold text-2xl",
                                                    children: "$"
                                                }, void 0, false, {
                                                    fileName: "[project]/frontend/app/crypto/[symbol]/page.js",
                                                    lineNumber: 735,
                                                    columnNumber: 23
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                    type: "number",
                                                    autoFocus: true,
                                                    placeholder: "0.00",
                                                    className: "bg-transparent text-2xl font-bold outline-none w-full",
                                                    value: sendAmount,
                                                    onChange: (e)=>{
                                                        setSendAmount(e.target.value);
                                                        setSendError("");
                                                    }
                                                }, void 0, false, {
                                                    fileName: "[project]/frontend/app/crypto/[symbol]/page.js",
                                                    lineNumber: 738,
                                                    columnNumber: 23
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/frontend/app/crypto/[symbol]/page.js",
                                            lineNumber: 734,
                                            columnNumber: 21
                                        }, this),
                                        sendAmount && parseFloat(sendAmount) > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-center text-sm text-gray-500",
                                            children: [
                                                "≈",
                                                " ",
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "font-bold text-[#F7931A]",
                                                    children: [
                                                        (parseFloat(sendAmount) / priceData.price).toFixed(8),
                                                        " ",
                                                        "BTC"
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/frontend/app/crypto/[symbol]/page.js",
                                                    lineNumber: 753,
                                                    columnNumber: 25
                                                }, this),
                                                " ",
                                                "at $",
                                                priceData.price.toLocaleString(),
                                                "/BTC"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/frontend/app/crypto/[symbol]/page.js",
                                            lineNumber: 751,
                                            columnNumber: 23
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex space-x-3",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    onClick: ()=>setSendStep(1),
                                                    className: "flex-1 bg-gray-100 dark:bg-zinc-800 font-bold py-4 rounded-full hover:scale-[1.02] active:scale-95 transition-all",
                                                    children: "Back"
                                                }, void 0, false, {
                                                    fileName: "[project]/frontend/app/crypto/[symbol]/page.js",
                                                    lineNumber: 763,
                                                    columnNumber: 23
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    disabled: !sendAmount || parseFloat(sendAmount) <= 0,
                                                    onClick: ()=>{
                                                        setSendError("");
                                                        setSendStep(3);
                                                    },
                                                    className: "flex-1 bg-[#F7931A] text-white font-bold py-4 rounded-full disabled:opacity-30 hover:scale-[1.02] active:scale-95 transition-all",
                                                    children: "Review"
                                                }, void 0, false, {
                                                    fileName: "[project]/frontend/app/crypto/[symbol]/page.js",
                                                    lineNumber: 769,
                                                    columnNumber: 23
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/frontend/app/crypto/[symbol]/page.js",
                                            lineNumber: 762,
                                            columnNumber: 21
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/frontend/app/crypto/[symbol]/page.js",
                                    lineNumber: 733,
                                    columnNumber: 19
                                }, this),
                                sendStep === 3 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "space-y-4",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "bg-gray-50 dark:bg-zinc-800 rounded-2xl p-5 space-y-3",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex justify-between",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "text-gray-500",
                                                            children: "To"
                                                        }, void 0, false, {
                                                            fileName: "[project]/frontend/app/crypto/[symbol]/page.js",
                                                            lineNumber: 788,
                                                            columnNumber: 25
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "font-bold text-[#F7931A]",
                                                            children: [
                                                                "$",
                                                                sendCashtag
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/frontend/app/crypto/[symbol]/page.js",
                                                            lineNumber: 789,
                                                            columnNumber: 25
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/frontend/app/crypto/[symbol]/page.js",
                                                    lineNumber: 787,
                                                    columnNumber: 23
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex justify-between",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "text-gray-500",
                                                            children: "Amount (USD)"
                                                        }, void 0, false, {
                                                            fileName: "[project]/frontend/app/crypto/[symbol]/page.js",
                                                            lineNumber: 794,
                                                            columnNumber: 25
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "font-bold",
                                                            children: [
                                                                "$",
                                                                parseFloat(sendAmount).toFixed(2)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/frontend/app/crypto/[symbol]/page.js",
                                                            lineNumber: 795,
                                                            columnNumber: 25
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/frontend/app/crypto/[symbol]/page.js",
                                                    lineNumber: 793,
                                                    columnNumber: 23
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex justify-between",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "text-gray-500",
                                                            children: "Amount (BTC)"
                                                        }, void 0, false, {
                                                            fileName: "[project]/frontend/app/crypto/[symbol]/page.js",
                                                            lineNumber: 800,
                                                            columnNumber: 25
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "font-bold",
                                                            children: [
                                                                (parseFloat(sendAmount) / priceData.price).toFixed(8),
                                                                " ",
                                                                "BTC"
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/frontend/app/crypto/[symbol]/page.js",
                                                            lineNumber: 801,
                                                            columnNumber: 25
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/frontend/app/crypto/[symbol]/page.js",
                                                    lineNumber: 799,
                                                    columnNumber: 23
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex justify-between border-t border-gray-200 dark:border-zinc-700 pt-3",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "text-gray-500",
                                                            children: "BTC Price"
                                                        }, void 0, false, {
                                                            fileName: "[project]/frontend/app/crypto/[symbol]/page.js",
                                                            lineNumber: 809,
                                                            columnNumber: 25
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "font-bold",
                                                            children: [
                                                                "$",
                                                                priceData.price.toLocaleString()
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/frontend/app/crypto/[symbol]/page.js",
                                                            lineNumber: 810,
                                                            columnNumber: 25
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/frontend/app/crypto/[symbol]/page.js",
                                                    lineNumber: 808,
                                                    columnNumber: 23
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex justify-between",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "text-gray-500",
                                                            children: "Fee"
                                                        }, void 0, false, {
                                                            fileName: "[project]/frontend/app/crypto/[symbol]/page.js",
                                                            lineNumber: 815,
                                                            columnNumber: 25
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "font-bold text-cashapp",
                                                            children: "$0.00"
                                                        }, void 0, false, {
                                                            fileName: "[project]/frontend/app/crypto/[symbol]/page.js",
                                                            lineNumber: 816,
                                                            columnNumber: 25
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/frontend/app/crypto/[symbol]/page.js",
                                                    lineNumber: 814,
                                                    columnNumber: 23
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/frontend/app/crypto/[symbol]/page.js",
                                            lineNumber: 786,
                                            columnNumber: 21
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex space-x-3",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    onClick: ()=>setSendStep(2),
                                                    className: "flex-1 bg-gray-100 dark:bg-zinc-800 font-bold py-4 rounded-full hover:scale-[1.02] active:scale-95 transition-all",
                                                    children: "Back"
                                                }, void 0, false, {
                                                    fileName: "[project]/frontend/app/crypto/[symbol]/page.js",
                                                    lineNumber: 820,
                                                    columnNumber: 23
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    disabled: sendProcessing,
                                                    onClick: ()=>setSendPinOpen(true),
                                                    className: "flex-1 bg-[#F7931A] text-white font-bold py-4 rounded-full disabled:opacity-50 hover:scale-[1.02] active:scale-95 transition-all",
                                                    children: sendProcessing ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__["Loader2"], {
                                                        className: "w-5 h-5 animate-spin mx-auto"
                                                    }, void 0, false, {
                                                        fileName: "[project]/frontend/app/crypto/[symbol]/page.js",
                                                        lineNumber: 832,
                                                        columnNumber: 27
                                                    }, this) : "Send Bitcoin"
                                                }, void 0, false, {
                                                    fileName: "[project]/frontend/app/crypto/[symbol]/page.js",
                                                    lineNumber: 826,
                                                    columnNumber: 23
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/frontend/app/crypto/[symbol]/page.js",
                                            lineNumber: 819,
                                            columnNumber: 21
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/frontend/app/crypto/[symbol]/page.js",
                                    lineNumber: 785,
                                    columnNumber: 19
                                }, this)
                            ]
                        }, void 0, true)
                    ]
                }, void 0, true, {
                    fileName: "[project]/frontend/app/crypto/[symbol]/page.js",
                    lineNumber: 647,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/frontend/app/crypto/[symbol]/page.js",
                lineNumber: 643,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$components$2f$PinModal$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                isOpen: sendPinOpen,
                onSuccess: async ()=>{
                    setSendPinOpen(false);
                    setSendProcessing(true);
                    setSendError("");
                    try {
                        const cashtag = sendCashtag.startsWith("$") ? sendCashtag : `$${sendCashtag}`;
                        await __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$lib$2f$api$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].post("/transfer/send-bitcoin", {
                            cashtag,
                            usdAmount: parseFloat(sendAmount)
                        });
                        setSendSuccess(true);
                    } catch (err) {
                        setSendError(err.response?.data?.message || err.message || "Send failed");
                    } finally{
                        setSendProcessing(false);
                    }
                },
                onClose: ()=>setSendPinOpen(false),
                userId: user?.id
            }, void 0, false, {
                fileName: "[project]/frontend/app/crypto/[symbol]/page.js",
                lineNumber: 847,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$components$2f$PinModal$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                isOpen: isPinOpen,
                onSuccess: ()=>{
                    setIsPinOpen(false);
                    handleConfirm();
                },
                onClose: ()=>setIsPinOpen(false),
                userId: user?.id
            }, void 0, false, {
                fileName: "[project]/frontend/app/crypto/[symbol]/page.js",
                lineNumber: 875,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/frontend/app/crypto/[symbol]/page.js",
        lineNumber: 258,
        columnNumber: 5
    }, this);
}
_s(CryptoDetailPage, "eNuXDfuBeK1ozLZaTEImgfwlQMQ=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$context$2f$AuthContext$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAuth"],
        __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"],
        __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useParams"]
    ];
});
_c = CryptoDetailPage;
var _c;
__turbopack_context__.k.register(_c, "CryptoDetailPage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=frontend_e8fe46a4._.js.map