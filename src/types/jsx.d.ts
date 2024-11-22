declare namespace JSX {
  interface IntrinsicElements {
    div: React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>;
    section: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
    button: React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>;
    ambientLight: any;
    pointLight: any;
    group: any;
    // Add other Three.js elements as needed
  }
} 