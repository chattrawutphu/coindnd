let defaultItems = [
    {
        id: "RtrIHskFIUu5GbcprUTYqA",
        type: "container",
        subtype: "if",
        title: "IfCondition Level 0",
        showChildren: true,
        active: true,
        group: {
            showGroup: true,
            name: "Group Name",
            message: "test group name",
            corlor: "green",
            showChildren: true,
            active: true
        },
        message: "",
        variables: [
            { id: "d1d-OcTnaEira8poGNgCxA", name: "x", type: "integer", value: 10, description: "" },
            { id: "MW_CmR-7rUOKr_kTskiBBQ", name: "y", type: "integer", value: -2, description: "" },
            { id: "zO2pyIzLN0CKsYka0Dp0dg", name: "target-symbol", type: "sytmbol", value: "BTC/USDT", description: "test variable" }
        ],
        conditions: [
            {
                id: "WwBwoxYfR0OEbmAPtWkE2g",
                type: "condition",
                subtype: "priceConditionWithCandlestick",
                subtypeid: "8Pwc1k",
                title: "if",
                message: "{params[0]} {params[1]} {params[2]}{params[3]} of the {params[4]} within the last {params[5]} candlesticks",
                params: [
                    { value: "btcusdt", text: "BTC/USDT", color: "yellow", type: "symbol", unit: "" },
                    { value: "gt", text: "Greater than", color: "lawngreen", type: "operator", unit: "" },
                    { value: "high", text: "Highest price", color: "aqua", type: "candlePrice", unit: "" },
                    { value: "inc-int", text: "+ 100", color: "white", type: "addition", unit: "" },
                    { value: "4h", text: "4 hour timeframe", color: "aqua", type: "timeframe", unit: "" },
                    { value: "20", text: "20", type: "candle", color: "white", unit: "" },
                ],
            },
            {
                id: "Qe4XPy7MrT0T1ZwD3V4Y6H",
                type: "condition",
                subtype: "priceCondition",
                subtypeid: "z3F2Gh",
                title: "or",
                message: "{params[0]} {params[1]} {params[2]}{params[3]}",
                params: [
                    { value: "solusdt", text: "SOL/USDT", color: "yellow", type: "symbol", unit: "" },
                    { value: "lt", text: "Less than", color: "lawngreen", type: "operator", unit: "" },
                    { value: "3000", text: "3000", color: "white", type: "price", unit: "$" },
                    { value: "", text: "", color: "white", type: "addition", unit: "" },
                    //{ value: "inc-int",text:"+ 100", color:"white", type: "addition", unit: "" },
                ],
            },
            {
                id: "1DjiFntJMkW5m5H7K42HgA",
                type: "condition",
                subtype: "balanceCondition",
                subtypeid: "k8L3Pm",
                title: "if",
                message: "{params[0]} balance is {params[1]} {params[2]}",
                params: [
                    { value: "usdt", text: "USDT", color: "yellow", type: "balanceSymbol", unit: "" },
                    { value: "gt", text: "Greater than", color: "lawngreen", type: "operator", unit: "" },
                    { value: "1000", text: "1000", color: "white", type: "price", unit: "$" },
                ],
            },
            {
                id: "TkUJdxawzEeFXOFOfyUtjA",
                type: "condition",
                subtype: "hasPositionCondition",
                subtypeid: "k8L3Pn",
                title: "if",
                message: "{params[0]} position is open",
                params: [
                    { value: "solusdt", text: "BTC/USDT", color: "yellow", type: "symbol", unit: "" },
                ],
            }
        ],
        actions: [
            {
                id: "mgda6S8WT06a4vvRV4Xm3w",
                type: "action",
                title: "action",
                message: "{params[0]} {params[1]} {params[2]}",
                params: [
                    { value: "LONG", type: "side", unit: "" },
                    { value: "BTCUSDT", type: "symbol", unit: "" },
                    { value: "500", type: "amount", unit: "$" }
                ],
                template: "placeOrder" // Updated template field
            }
        ],
        children: [
            {
                id: "Dz6RG8FqUUe2EBX2gtdb6A",
                type: "container",
                subtype: "if",
                title: "IfCondition Level 1",
                showChildren: true,
                active: true,
                group: {
                    showGroup: false,
                    name: "Group Name 2",
                    message: "test group name 2",
                    corlor: "green",
                    showChildren: true,
                    active: true
                },
                message: "Test comment for dev!",
                variables: [
                    { id: "1OsYLCv-xUym6SNMTBLCog", name: "x", type: "integer", value: 10, description: "" },
                ],
                conditions: [
                    {
                        id: "BQZSHU_IsUGE0ZyqGo2Mxg",
                        type: "condition",
                        title: "if",
                        message: "{params[0]} {params[1]} {params[2]}",
                        params: [
                            { value: "FROG", type: "symbol", unit: "" },
                            { value: "<=", type: "operator", unit: "" },
                            { value: "40000", type: "price", unit: "$" }
                        ],
                        template: "priceCondition" // Added template field
                    },
                    {
                        id: "GgJ3YzKfA8e1rD6wP7Nz9L",
                        type: "condition",
                        title: "and",
                        message: "{params[0]} {params[1]} {params[2]}",
                        params: [
                            { value: "XRPUSDT", type: "symbol", unit: "" },
                            { value: ">", type: "operator", unit: "" },
                            { value: "0.75", type: "price", unit: "$" }
                        ],
                        template: "priceCondition" // Added template field
                    }
                ],
                actions: [
                    {
                        id: "nP7QgL0Zr9kT2vXcG8Vb3M",
                        type: "action",
                        title: "action",
                        message: "{params[0]} {params[1]} {params[2]}",
                        params: [
                            { value: "SELL", type: "side", unit: "" },
                            { value: "ETHUSDT", type: "symbol", unit: "" },
                            { value: "200", type: "amount", unit: "$" }
                        ],
                        template: "placeOrder" // Updated template field
                    }
                ],
                children: [
                    {
                        id: "DkA9QKRewU2XtP9Dnb3OYo",
                        type: "container",
                        subtype: "if",
                        title: "IfCondition Level 2A",
                        showChildren: true,
                        active: true,
                        group: {
                            showGroup: false,
                            name: "Group Name 3",
                            message: "test group name 3",
                            corlor: "green",
                            showChildren: true,
                            active: true
                        },
                        message: "Test comment for dev!",
                        variables: [],
                        conditions: [
                            {
                                id: "FZQXLU_Hf3je0aOxlKxQqE",
                                type: "condition",
                                title: "if",
                                message: "{params[0]} {params[1]} {params[2]}",
                                params: [
                                    { value: "LTCUSDT", type: "symbol", unit: "" },
                                    { value: ">", type: "operator", unit: "" },
                                    { value: "200", type: "price", unit: "$" }
                                ],
                                template: "priceCondition" // Added template field
                            },
                            {
                                id: "D8v4KJ0Hq1O6fB9R0S2Y6F",
                                type: "condition",
                                title: "or",
                                message: "{params[0]} {params[1]} {params[2]}",
                                params: [
                                    { value: "BNBUSDT", type: "symbol", unit: "" },
                                    { value: "<=", type: "operator", unit: "" },
                                    { value: "300", type: "price", unit: "$" }
                                ],
                                template: "priceCondition" // Added template field
                            }
                        ],
                        actions: [],
                        children: []
                    }
                ]
            }
        ]
    }
];

export { defaultItems };
