<script>
    import { onMount } from 'svelte';
    
    let command = '';
    let output = [];
    let history = [];
    let historyIndex = -1;
    
    const user = 'user';
    const host = 'host';
    const bannerText = 'Welcome to the terminal!';

    function handleCommand(event) {
        if (event.key === 'Enter') {
            output = [...output, { command, result: executeCommand(command) }];
            history = [...history, command];
            historyIndex = history.length;
            command = '';
        } else if (event.key === 'ArrowUp') {
            if (historyIndex > 0) {
                historyIndex--;
                command = history[historyIndex];
            }
        } else if (event.key === 'ArrowDown') {
            if (historyIndex < history.length - 1) {
                historyIndex++;
                command = history[historyIndex];
            } else {
                historyIndex = history.length;
                command = '';
            }
        }
    }
    
    function executeCommand(command) {
        switch (command.trim()) {
            case 'help':
                return 'Available commands: help, echo, clear, date, ls';
            case 'clear':
                output = [];
                return '';
            case 'date':
                return new Date().toLocaleString();
            case 'ls':
                return 'file1.txt\nfile2.txt\ndir1\ndir2';
            default:
                if (command.startsWith('echo ')) {
                    return command.slice(5);
                }
                return `Command not found: ${command}`;
        }
    }

    let inputField;

    onMount(() => {
        if (inputField) {
            inputField.focus();
        }
    });
</script>

<style>
    .terminal {
        background: #1e1e1e;
        color: #00ff00;
        font-family: 'Courier New', Courier, monospace;
        width: 100vw;
        height: 100vh;
        margin: 0;
        display: flex;
        flex-direction: column;
        box-sizing: border-box;
    }
    .prompt, .banner {
        background: #333;
        color: #00ff00;
        padding: 10px;
        text-align: left;
        font-family: 'Courier New', Courier, monospace;
        font-size: 1.2rem;
        box-sizing: border-box;
    }
    .banner {
        margin-top: 50px;
    }
    .input {
        display: flex;
        align-items: center;
        width: 100%;
        background: #1e1e1e;
        padding: 10px;
        box-sizing: border-box;
    }
    input {
        background: #1e1e1e;
        border: none;
        color: #00ff00;
        outline: none;
        flex-grow: 1;
        font-size: 1rem;
        padding: 0.5rem;
        margin: 0;
        box-sizing: border-box;
        font-family: 'Courier New', Courier, monospace;
        line-height: 1.5;
    }
    .output {
        flex-grow: 1;
        white-space: pre-wrap;
        overflow-y: auto;
        padding: 10px;
        box-sizing: border-box;
        margin-top: 10px;
    }
</style>

<div class="terminal">
    <div class="prompt">
        {user}@{host}:~$
    </div>
    <div class="banner">
        {bannerText}
    </div>
    <div class="output" aria-live="polite">
        {#each output as { command, result }}
            <div class="prompt">{user}@{host}:~$ {command}</div>
            <div>{result}</div>
        {/each}
    </div>
    <div class="input">
        <input type="text" bind:this={inputField} bind:value={command} on:keydown={handleCommand} aria-label="Terminal command input" />
    </div>
</div>
