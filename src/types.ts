export interface Video {
  id: string;
  title: string;
  url: string;
  duration?: string;
  description?: string;
}

export interface Note {
  id: string;
  title: string;
  pdfUrl: string;
  topic?: string;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswerIndex: number;
  explanation?: string;
}

export interface MindMapNode {
  id: string;
  label: string;
  color?: string;
  description?: string;
  children?: MindMapNode[];
}

export interface MindMap {
  id: string;
  title: string;
  topic: string;
  rootNode: MindMapNode;
}

export interface Simulation {
  id: string;
  title: string;
  type: "physics" | "chemistry" | "math" | "language" | "geo";
  description: string;
  instructions: string;
  initialValue?: number;
}

export interface Subject {
  id: string;
  name: string;
  englishName: string;
  icon: string;
  color: string;
  gradient: string;
  textColor: string;
  description: string;
  videos: Video[];
  notes: Note[];
  quiz: QuizQuestion[];
  mindMaps?: MindMap[];
  simulations?: Simulation[];
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  photoUrl: string;
  bio: string;
  email?: string;
}

export interface Flashcard {
  id: string;
  question: string;
  answer: string;
  subject: string;
}

export interface AdminConfig {
  username: string;
  passwordHash: string; // Stored safely in local state
  isLocked: boolean;
}
