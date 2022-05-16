import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';



class Calculation extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            prenum: [],//記号前の値
            curnum: [],//記号後の値
            calc: "",//記号
            calclist:[],//計算で使う記号
            calclast:[],//押された記号全部
            numflag: false,
            calcflag: false,
            answer: null
        };
    }

    //計算記号決定
    calcSymbolDecision(i){
        this.setState({answer: null})
        if(this.state.calcflag === false){
            this.setState({calcflag: true}, () => { console.log(this.state.calcflag)})
            // console.log(this.state.calcflag)
            this.joinValue(i)
        }
  
        this.setState({calc: i})
        this.setState({calclast: [...this.state.calclast, i]})
    }

    //値結合
    joinValue(i){
        const all = this.state.prenum.join("") 
        this.state.curnum.push(Number(all))
        this.setState({prenum: []})
    }

    //記号を押したときの表示
    rendercalc(value){
        return <button 
            onClick={() => this.calcSymbolDecision(value)}>{value}</button>;   
    }
    
    //数値連続入力
    continueInputValue(inputNum){
        this.setState({answer: null})
        if(this.state.calcflag === true){
            this.setState({calcflag: false})
            this.setState({calclist:[...this.state.calclist, this.state.calclast.slice(-1)]})
        }
        this.setState({prenum: [...this.state.prenum,inputNum]})
        this.setState({calc: ""})
    }

    //すべて初期化
    resetAll(i){
        this.setState({prenum: []})
        this.setState({calclist: []})
        this.setState({calclast: []})
        this.setState({curnum: []})
        this.setState({calc: ""})
        this.setState({answer: null})
    }

    //計算結果
    calcResult(i){
        this.joinValue(i)
        if(this.state.calclist.slice(-1) == '+'){//足し算
            const result = this.state.curnum.reduce((accumulator, currentValue) => {
            return accumulator + currentValue;
              }, 0);
            this.setState({answer: result})
            this.setState({curnum: [result]})
        }else if(this.state.calclist.slice(-1) == "-"){//引き算
            const result = this.state.curnum.reduce((accumulator, currentValue) => {
            return accumulator - currentValue;
            });
            this.setState({answer: result})
            this.setState({curnum: [result]})
        }else if(this.state.calclist.slice(-1) == "*"){//掛け算
            const result = this.state.curnum.reduce((accumulator, currentValue) => {
            return accumulator * currentValue;
                }, 1);
            this.setState({answer: result})
            this.setState({curnum: [result]})
        }else if(this.state.calclist.slice(-1) == "/"){//割り算
            const result = this.state.curnum.reduce((accumulator, currentValue) => {
            return accumulator /  currentValue;
                });
            this.setState({answer: result})
            this.setState({curnum: [result]})
        }
    }

    render() {
        // console.log({calclist: this.state.calclist})
        //console.log(this.state.calclist)
        // console.log(this.state.calclast)
        // console.log(this.state.prenum)
        console.log(this.state.curnum)
        // console.log(this.state.calc)
        return (
            <div>
                <div class="display">
                    {/* {this.state.prenum.map((value) => {
                        return <>{value}</>
                    })} */}
                    {this.state.prenum}
                    {this.state.calc}
                    {this.state.answer}
                </div>
                <div>
                    <button onClick={()=> this.continueInputValue("7")}>7</button>
                    <button onClick={()=> this.continueInputValue("8")}>8</button>
                    <button onClick={()=> this.continueInputValue("9")}>9</button>
                    {this.rendercalc("/")}
                </div>
                <div>
                    <button onClick={()=> this.continueInputValue("4")}>4</button>
                    <button onClick={()=> this.continueInputValue("5")}>5</button>
                    <button onClick={()=> this.continueInputValue("6")}>6</button>
                    {this.rendercalc("*")}
                </div>
                <div>
                    <button onClick={()=> this.continueInputValue("1")}>1</button>
                    <button onClick={()=> this.continueInputValue("2")}>2</button>
                    <button onClick={()=> this.continueInputValue("3")}>3</button>
                    {this.rendercalc("-")}
                </div>
                <div>
                    <button onClick={()=> this.continueInputValue("0")}>0</button>
                    <button onClick={()=>this.resetAll("0")}>re</button>
                    <button onClick={()=>this.calcResult("=")}>=</button>
                    {this.rendercalc("+")}
                </div>
            </div>
        );
    }
}

// ========================================

ReactDOM.render(
    <Calculation />,
    document.getElementById('root')
);
