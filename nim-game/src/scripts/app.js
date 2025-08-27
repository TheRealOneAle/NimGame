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
            button.onclick = (event) => {
                const stonesToRemove = parseInt(event.target.dataset.stones);
                this.removeStones(stonesToRemove);
            };
        });
        // Botón de reinicio
        const restartBtn = document.getElementById('restart-btn');
        if (restartBtn) {
            restartBtn.onclick = () => window.location.reload();
        }
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
        document.getElementById('count').innerText = this.stones;
        document.getElementById('message').innerText = this.message;

        const stonesVisual = document.getElementById('stones-visual');
        stonesVisual.innerHTML = '';

        // Máximo 10 piedras por columna
        const maxRows = 10;
        const columns = Math.ceil(this.stones / maxRows);

        // Ajusta el grid-template-columns dinámicamente
        stonesVisual.style.gridTemplateColumns = `repeat(${columns}, 2em)`;
        stonesVisual.style.gridAutoRows = '2em';

        // Crea una matriz para las columnas
        let cols = Array.from({ length: columns }, () => Array(maxRows).fill(null));

        // Distribuye las piedras en columnas (de abajo hacia arriba)
        for (let i = 0; i < this.stones; i++) {
            const col = Math.floor(i / maxRows);
            const row = i % maxRows;
            cols[col][row] = '🪨';
        }

        // Agrega las piedras al grid, de abajo hacia arriba por columna
        for (let row = maxRows - 1; row >= 0; row--) {
            for (let col = 0; col < columns; col++) {
                    if (cols[col][row]) {
                    const stone = document.createElement('span');
                    stone.className = 'stone-emoji';
                    stone.textContent = cols[col][row];
                    stonesVisual.appendChild(stone);
                    } else if (this.stones > 0) {
                    // Para mantener el grid alineado, agrega un espacio vacío si no hay piedra en esa posición
                        const empty = document.createElement('span');
                        empty.className = 'stone-emoji';
                        empty.textContent = '';
                        stonesVisual.appendChild(empty);
                    }
                }
            }
        }
};

document.addEventListener('DOMContentLoaded', () => {
    game.init();
    game.addEventListeners(); // Solo una vez
});