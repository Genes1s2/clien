declare module 'react-pptx' {
  // Core Presentation Component
  export interface PresentationProps {
    children: React.ReactNode;
    author?: string;
    layout?: 'LAYOUT_4x3' | 'LAYOUT_16x9' | 'LAYOUT_WIDE';
  }

  export const Presentation: React.FC<PresentationProps>;

  // Slide Component
  export interface SlideProps {
    children?: React.ReactNode;
    style?: {
      backgroundColor?: string;
    };
  }

  export const Slide: React.FC<SlideProps>;

  // Text Component
  export interface TextProps {
    children: React.ReactNode;
    style?: {
      x: number;  // Inches from left
      y: number;  // Inches from top
      w?: number; // Width in inches
      h?: number; // Height in inches
      fontSize?: number; // Points
      color?: string; // Hex code
    };
  }

  export const Text: React.FC<TextProps>;

  // Image Component
  export interface ImageProps {
    src: string;
    style?: {
      x: number;
      y: number;
      w: number;
      h: number;
    };
  }

  export const Image: React.FC<ImageProps>;
}