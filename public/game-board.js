const GameBoard = () => {
    const numRows = 10;
    const numCols = 15;


    const [selectedTile, setSelectedTile] = React.useState(null);


    const colColors = [
        
        // Define RGBA color arrays for each column
        //col 1 (1)
        [
            'rgba(95,44,15,255)', 'rgba(148,87,26,255)', 'rgba(201,130,38,255)', 'rgba(226,168,32,255)', 
            'rgba(252,207,26,255)', 'rgba(246,221,30,255)', 'rgba(241,235,35,255)', 'rgba(182,200,49,255)', 
            'rgba(124,165,63,255)',
        ],
        //col 2 (3)
        [
            'rgba(117,34,20,255)', 'rgba(169,76,29,255)', 'rgba(221,118,39,255)', 'rgba(237,159,41,255)', 
            'rgba(253,200,44,255)', 'rgba(244,216,47,255)', 'rgba(235,233,50,255)', 'rgba(169,192,53,255)', 
            'rgba(103,152,56,255)'
        ],
        //col 3 (5)
        [
            'rgba(148,30,30,255)', 'rgba(189,67,34,255)', 'rgba(230,105,38,255)', 'rgba(242,151,56,255)', 
            'rgba(255,198,75,255)', 'rgba(243,213,71,255)', 'rgba(231,229,67,255)', 'rgba(156,184,58,255)', 
            'rgba(82,139,49,255)', 
        ],
        //col 4 (7)
        [
            'rgba(174,31,35,255)', 'rgba(207,63,39,255)', 'rgba(241,96,43,255)', 'rgba(248,141,69,255)', 
            'rgba(255,186,95,255)', 'rgba(231,205,93,255)', 'rgba(208,224,92,255)', 'rgba(134,175,67,255)', 
            'rgba(61,126,43,255)', 
        ],
        //col5 (9)
        [
            'rgba(224,30,38,255)', 'rgba(232,54,50,255)', 'rgba(240,78,63,255)', 'rgba(246,128,92,255)',
            'rgba(253,178,121,255)', 'rgba(215,196,114,255)', 'rgba(177,214,108,255)', 'rgba(108,163,72,255)',
            'rgba(40,113,36,255)',
        ],
        
        //col6 (11)
        [
            'rgba(240,30,35,255)', 'rgba(239,62,67,255)', 'rgba(239,94,99,255)', 'rgba(244,134,120,255)',
            'rgba(249,174,142,255)', 'rgba(204,191,134,255)', 'rgba(159,208,127,255)', 'rgba(89,154,78,255)',
            'rgba(20,100,30,255)',
        ],
        
        //col7 (13)
        [
            'rgba(255,30,46,255)', 'rgba(247,59,79,255)', 'rgba(240,88,113,255)', 'rgba(242,135,143,255)',
            'rgba(245,182,173,255)', 'rgba(196,193,163,255)', 'rgba(147,205,154,255)', 'rgba(88,162,100,255)',
            'rgba(29,120,46,255)',
        ],
        
        //col8 (15)
        [
            'rgba(236,25,70,255)', 'rgba(238,52,104,255)', 'rgba(241,79,139,255)', 'rgba(239,129,170,255)',
            'rgba(238,180,202,255)', 'rgba(190,193,184,255)', 'rgba(142,207,167,255)', 'rgba(90,174,114,255)',
            'rgba(39,141,62,255)',
        ],
        
        //col9 (17)
        [
            'rgba(231,20,101,255)', 'rgba(227,52,130,255)', 'rgba(223,85,160,255)', 'rgba(215,134,188,255)',
            'rgba(207,183,217,255)', 'rgba(174,196,204,255)', 'rgba(142,209,192,255)', 'rgba(95,185,135,255)',
            'rgba(48,161,78,255)',
        ],
        
        //col10 (19)
        [
            'rgba(216,15,131,255)', 'rgba(203,54,148,255)', 'rgba(190,94,165,255)', 'rgba(185,131,188,255)',
            'rgba(180,169,211,255)', 'rgba(155,188,207,255)', 'rgba(131,207,203,255)', 'rgba(94,194,148,255)',
            'rgba(58,182,94,255)',
        ],
        
        //col11 (21)
        [
            'rgba(200,39,145,255)', 'rgba(182,61,153,255)', 'rgba(165,84,161,255)', 'rgba(158,116,181,255)',
            'rgba(151,148,201,255)', 'rgba(128,175,209,255)', 'rgba(105,202,218,255)', 'rgba(84,193,165,255)',
            'rgba(63,185,112,255)',
        ],
        
        //col12 (23)
        [
            'rgba(179,51,148,255)', 'rgba(163,63,153,255)', 'rgba(148,76,158,255)', 'rgba(132,100,173,255)',
            'rgba(117,125,188,255)', 'rgba(87,162,213,255)', 'rgba(57,199,239,255)', 'rgba(53,193,188,255)',
            'rgba(49,187,138,255)',
        ],
        
        //col13 (25)
        [
            'rgba(159,56,148,255)', 'rgba(144,61,152,255)', 'rgba(130,67,156,255)', 'rgba(111,87,166,255)',
            'rgba(92,107,176,255)', 'rgba(77,138,200,255)', 'rgba(62,169,225,255)', 'rgba(47,178,193,255)',
            'rgba(33,187,161,255)',
        ],
        
        //col14 (27)
        [
            'rgba(140,61,152,255)', 'rgba(125,61,151,255)', 'rgba(111,62,151,255)', 'rgba(91,75,159,255)',
            'rgba(72,89,167,255)', 'rgba(68,112,183,255)', 'rgba(65,136,200,255)', 'rgba(44,162,194,255)',
            'rgba(24,188,189,255)',
        ],
        
        //col15 (29)
        [
            'rgba(125,62,153,255)', 'rgba(106,56,150,255)', 'rgba(87,51,147,255)', 'rgba(67,59,152,255)',
            'rgba(47,68,157,255)', 'rgba(52,90,170,255)', 'rgba(58,112,184,255)', 'rgba(37,147,199,255)',
            'rgba(16,183,215,255)', 
        ],
         /* 
        //bottom row (testing)
        ['rgba(124,165,63,255)', 'rgba(103,152,56,255)', 'rgba(82,139,49,255)', 'rgba(61,126,43,255)', 
        'rgba(40,113,36,255)', 'rgba(20,100,30,255)', 'rgba(29,120,46,255)', 'rgba(39,141,62,255)', 
        'rgba(48,161,78,255)', 'rgba(58,182,94,255)', 'rgba(49,182,118,255)', 'rgba(41,182,142,255)', 
        'rgba(32,182,166,255)', 'rgba(24,182,190,255)', 'rgba(16,183,215,255)',
        ]
        */
        
    ];

    const generateTileKey = (row, col) => {
        return `${row}-${col}`;
    };

    const handleClick = (color) => {
        
        setSelectedTile(color);
    
    };

    const handleSubmit = () => {
        // Logic for handling the submission of the selected tile
        console.log(`Submitted tile: ${selectedTile}`);
    };

    const hintText = "Try to guess this color!"; // Your hint text

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div className="board" style={{ display: 'grid', gridTemplateColumns: `repeat(${numCols}, 30px)`, gridGap: '4px' }}>
                {Array.from({ length: numRows }, (_, rowIndex) => (
                    Array.from({ length: numCols }, (_, colIndex) => (
                        <div
                            key={generateTileKey(rowIndex, colIndex)}
                            className="tile"
                            style={{
                                width: '30px',
                                height: '30px',
                                backgroundColor: colColors[colIndex][rowIndex],
                                boxShadow: selectedTile === colColors[colIndex][rowIndex] ? '0 0 0 2px black' : 'none',
                            }}
                            onClick={() => handleClick(colColors[colIndex][rowIndex])}
                        />
                    ))
                ))}
            </div>
            {hintText && <small style={{ marginTop: '4px' }}>{hintText}</small>}
            {selectedTile && (
                <div className="selected-tile" style={{ width: '60px', height: '60px', backgroundColor: selectedTile, margin: '8px auto', boxShadow: '0 0 0 2px white' }} />
            )}
            {selectedTile && (
                <button onClick={handleSubmit} style={{ marginTop: '8px' }}>Submit</button>
            )}
        </div>
    );
    
};

ReactDOM.render(<GameBoard />, document.getElementById('root'));
