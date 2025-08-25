const game = {
    stones: 21,
    currentPlayer: 'Player 1',
    message: '',

    init: function() {
        this.stones = 21;
        this.currentPlayer = 'Player 1';
        this.message = "Player 1's turn.";
        this.updateUI();
    },

    addEventListeners: function() {
        const buttons = document.querySelectorAll('.remove-button');
        buttons.forEach(button => {
            // Elimina cualquier listener anterior antes de agregar uno nuevo
            button.onclick = (event) => {
                const stonesToRemove = parseInt(event.target.dataset.stones);
                this.removeStones(stonesToRemove);
            };
        });
    },

    removeStones: function(stonesToRemove) {
        if (stonesToRemove < 1 || stonesToRemove > 3) {
            this.message = 'You can only remove 1 to 3 stones.';
            this.updateUI();
            return;
        }

        if (this.stones >= stonesToRemove) {
            this.stones -= stonesToRemove;
            this.checkWinner();
            this.updateUI();
        } else {
            this.message = 'Not enough stones to remove.';
            this.updateUI();
        }
    },

    switchPlayer: function() {
        this.currentPlayer = this.currentPlayer === 'Player 1' ? 'Player 2' : 'Player 1';
    },

    checkWinner: function() {
        if (this.stones === 0) {
            this.message = `${this.currentPlayer} wins!`;
            // Aquí podrías deshabilitar los botones o mostrar un botón de reinicio
        }else {
            this.switchPlayer();
            this.message = `${this.currentPlayer}'s turn.`;
        }
    },

    updateUI: function() {
        document.getElementById('stone-count').innerText = this.stones;
        document.getElementById('message').innerText = this.message;
    }
};

document.addEventListener('DOMContentLoaded', () => {
    game.init();
    game.addEventListeners(); // Solo una vez
});