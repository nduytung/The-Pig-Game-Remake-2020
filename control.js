var UIModule = (function () {

    var number;

    return {

        displayWinner: function (id) {
            id == 0 ? number = 1 :  number = 0;
            document.getElementById('player_' + number).textContent = 'GÀÀÀÀÀÀÀÀÀ';
            document.getElementById('player_' + id).textContent = 'WINNER !';
            document.getElementById('instance_' + id).textContent = 0;
            document.getElementById('dice').src = 'dice-1.png';
        },

        changeStyle: function (result) {
            document.getElementById('dice').src = 'dice-' + result + '.png';
        },

        displayInstance: function (result, id) {
            document.getElementById('instance_'+ id).textContent = result;
        },

        displayTurn: function (thisTurn, id) {
          document.getElementById('turn_' + id).textContent = 'THIS TURN: ' + thisTurn;  
        },

        displayTotal: function (total, id) {
            document.getElementById('total_' + id).textContent = 'TOTAL: ' + total;
        },
    }

})();

//-----------------------------------------------------------------------------------------------//

var scoreModule = (function () {

    var turnScore = {
        0: [],
        1: [],
    };

    var total= {
        0: [],
        1: [],
    };

    var result, s;

    return {

        deleteArray: function (id) {
            (id == 0) ? id = 1 : id = 0;
            turnScore[id] = [];
        },

        ranNum: function () {
            return result = Math.floor(Math.random() * 6 + 1);
        },

        turnScore: function (result, id) {
            turnScore[id].push(result);
            return turnScore;
        },

        thisTurn: function (turnScore, id) {
            s = 0;
            for(var i = 0; i<turnScore[id].length; i++) 
                s += turnScore[id][i];
            return s;
        },

        calculateTotal: function(result, id) {
            total[id] += result;
            total[id] = parseFloat(total[id]);
            return total[id];
        },
    }
})(UIModule);

//-----------------------------------------------------------------------------------------------//

var centralModule = (function (UI, score) {

    var id = 0, total, turnScore, thisTurn;
    
    //setup eventlisteners
    var setupEventListener = function () {
        //nut ROLL (an vao xuc xac)
        document.getElementById('dice').addEventListener('click', controlInput);
        //nut ENDTURN 
        document.getElementById('endTurn').addEventListener('click', controlEndturn);
        //nut NEWGAME
        document.getElementById('newGame').addEventListener('click', controlNewgame);
        document.addEventListener('keypress', function (event) {
            if (event.keyCode == 13 )
                UI.getInput();
        })
    };

    var controlInput = function () {

        //1.random ket qua
        result = score.ranNum();
    
        //va luu result ny vao 1 mang de cong vao luot do 
        turnScore = score.turnScore(result, id);
    
        //2. neu khac 1 thi cho display cac thu cac thu
        if (result != 1 )  {
    
            //1. display len current 
            UI.displayInstance(result, id);
    
            //2. thay hinh cuc xuc xac
            UI.changeStyle(result);
    
            //3. cong don va display len thisturn
            thisTurn = score.thisTurn(turnScore, id);
    
            //4. display len total
            total = score.calculateTotal(result, id);
            UI.displayTurn(thisTurn, id);
            UI.displayTotal(total, id);
        
            //tinh toan winner
            if (total >=100) {
                UI.displayWinner(id);
                UI.displayTurn(0,0);
                UI.displayTurn(0,1);
                document.getElementById('dice').removeEventListener('click', controlInput);
            }
        }
    
        //neu bang 1 thi bat buoc dung turn 
        if (result == 1 ) {
            controlEndturn();
        };
    
        return id;
    };
    
    var controlEndturn = function () {
    
        //1. doi ID 
        (id == 0 ) ? id = 1 : id = 0; 
    
        //2.tra current ve 0
        UI.displayInstance(0, id);
    
        //3. doi xuc xac ve 0
        UI.changeStyle(1);

        //4. doi this turn ve 0
        UI.displayTurn(0, id);
    
        score.deleteArray(id);
        return id;
    };

    var controlNewgame = function (){
        location.reload(true);
    };

    return {
        init: function () {
            return setupEventListener();
        },
    }
})(UIModule, scoreModule);

centralModule.init();
