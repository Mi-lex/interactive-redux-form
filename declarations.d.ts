// We need to tell TypeScript that when we write "import styles from './*.module.css' we mean to load a module (to look for a './styles.scss.d.ts').
declare module '*module.css';
declare module '*.svg';
