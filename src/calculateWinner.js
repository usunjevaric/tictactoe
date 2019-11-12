export function calculateWinner(squares) {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];
    return lines.reduce((acc,line,idx)=>{
        const[a,b,c]=line;

        let dir;
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            if(idx<=2){
                dir=1;
            }else if(idx<=5){
                dir=2;
            }else if(idx===6){
                dir=3
            }else if(idx===7){
                dir=4
            }
            acc.player=squares[a];
            acc.line=line;
            acc.direction=dir;
        }
        return acc;
    },{
        player:'',
        line:[],
        direction:-1
    })
}