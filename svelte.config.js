import adapter from '@sveltejs/adapter-static';
import preprocess from 'svelte-preprocess';

const config = {
    preprocess: preprocess(),

    kit: {
        adapter: adapter({
            pages: 'build',
            assets: 'build',
            fallback: 'index.html'
        }),
        paths: {
            base: process.env.NODE_ENV === 'production' ? '/my-terminal-app' : ''
        }
    }
};

export default config;


