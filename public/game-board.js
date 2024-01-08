const GameBoard = () => {
    const numRows = 12;
    const numCols = 3;

    const colColors = [
        // Define RGBA color arrays for each column
        //col 1
        [
            'rgba(95,44,15,255)', 'rgba(126,76,17,255)', 'rgba(157,109,19,255)', 'rgba(189,141,21,255)',
            'rgba(220,174,23,255)', 'rgba(252,207,26,255)', 'rgba(230,200,32,255)', 'rgba(209,193,38,255)',
            'rgba(188,186,44,255)', 'rgba(166,179,50,255)', 'rgba(145,172,56,255)', 'rgba(124,165,63,255)'
        ],
        //col 2
        [
            'rgba(117,34,20,255)', 'rgba(144,67,24,255)', 'rgba(171,100,29,255)', 'rgba(198,133,34,255)',
            'rgba(225,166,39,255)', 'rgba(253,200,44,255)', 'rgba(229,194,48,255)', 'rgba(205,189,52,255)',
            'rgba(182,183,56,255)', 'rgba(158,178,60,255)', 'rgba(134,172,64,255)', 'rgba(111,167,68,255)'
        ],
        //col 3
        [
            'rgba(148,30,30,255)', 'rgba(169,63,39,255)', 'rgba(190,97,48,255)', 'rgba(212,130,57,255)',
            'rgba(233,164,66,255)', 'rgba(255,198,75,255)', 'rgba(227,192,74,255)', 'rgba(200,186,73,255)',
            'rgba(172,180,73,255)', 'rgba(145,174,72,255)', 'rgba(117,168,71,255)', 'rgba(90,163,71,255)'
        ]
        
        
    ];

    const generateTileKey = (row, col) => {
        return `${row}-${col}`;
    };

    const handleClick = (color) => {
        // Handle user's click on a tile (make a guess, for example)
    };

    return (
        <div className="board" style={{ display: 'grid', gridTemplateColumns: `repeat(${numCols}, 30px)` }}>
            {Array.from({ length: numRows }, (_, rowIndex) => (
                Array.from({ length: numCols }, (_, colIndex) => (
                    <div
                        key={generateTileKey(rowIndex, colIndex)}
                        className="tile"
                        style={{
                            width: '30px',
                            height: '30px',
                            backgroundColor: colColors[colIndex][rowIndex],
                        }}
                        onClick={() => handleClick(colColors[colIndex][rowIndex])}
                    />
                ))
            ))}
        </div>
    );
};

ReactDOM.render(<GameBoard />, document.getElementById('root'));
