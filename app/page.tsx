"use client";

import { useState, useEffect } from "react";
import {
  ChevronUp,
  MessageSquare,
  Share2,
  Bookmark,
  MoreHorizontal,
  Search,
  Github,
  Plus,
  SunMedium,
  Moon,
  ArrowUpDown,
  Rocket,
  X,
  Check,
  Copy,
  ExternalLink,
  Linkedin,
  GithubIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/components/theme-provider";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
} from "@/components/ui/sheet";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import SplashScreen from "./SpashScreen";

// Mock data for categories with colors
const categories = [
  { id: 1, name: "General", slug: "general", color: "bg-blue-500" },
  { id: 2, name: "Technology", slug: "technology", color: "bg-purple-500" },
  { id: 3, name: "Design", slug: "design", color: "bg-pink-500" },
  { id: 4, name: "Development", slug: "development", color: "bg-emerald-500" },
  { id: 5, name: "Career", slug: "career", color: "bg-amber-500" },
];

// Mock data for threads
const initialThreads = [
  {
    id: 1,
    title: "How to build a minimalistic forum?",
    author: "Alex Chen",
    authorImage: "/placeholder.svg?height=40&width=40",
    timestamp: "2 hours ago",
    category: "design",
    upvotes: 24,
    comments: 8,
    isAdmin: false,
    preview:
      "I'm looking to create a clean, minimalistic forum design that focuses on content and readability. Any suggestions on typography and spacing?",
    commentsList: [
      {
        id: 1,
        author: "Jamie Smith",
        authorImage: "/placeholder.svg?height=40&width=40",
        content:
          "I'd recommend focusing on typography first. A good readable font with proper line height makes all the difference.",
        timestamp: "1 hour ago",
      },
      {
        id: 2,
        author: "Riley Johnson",
        authorImage: "/placeholder.svg?height=40&width=40",
        content:
          "White space is your friend! Don't be afraid to add generous margins and padding.",
        timestamp: "45 minutes ago",
      },
    ],
  },
  {
    id: 2,
    title: "Best practices for React state management in 2025",
    author: "Jamie Smith",
    authorImage: "/placeholder.svg?height=40&width=40",
    timestamp: "5 hours ago",
    category: "development",
    upvotes: 42,
    comments: 15,
    isAdmin: false,
    preview:
      "With so many options available now (Context, Redux, Zustand, Jotai, etc.), what's the current consensus on the best approach for state management in React applications?",
    commentsList: [
      {
        id: 1,
        author: "Casey Martinez",
        authorImage: "/placeholder.svg?height=40&width=40",
        content:
          "I've been using Zustand for most projects lately. It's simple, has a tiny footprint, and works great with TypeScript.",
        timestamp: "4 hours ago",
      },
      {
        id: 2,
        author: "Jordan Lee",
        authorImage: "/placeholder.svg?height=40&width=40",
        content:
          "Context API for component-level state, Zustand for global state, and React Query for server state has been my go-to stack.",
        timestamp: "3 hours ago",
      },
    ],
  },
  {
    id: 3,
    title: "Introducing yourself at tech meetups - tips?",
    author: "Taylor Wong",
    authorImage: "/placeholder.svg?height=40&width=40",
    timestamp: "1 day ago",
    category: "career",
    upvotes: 18,
    comments: 12,
    isAdmin: false,
    preview:
      "I'm attending my first tech meetup next week and I'm a bit nervous. How do you introduce yourself effectively without sounding like you're just reciting your resume?",
    commentsList: [
      {
        id: 1,
        author: "Morgan Williams",
        authorImage: "/placeholder.svg?height=40&width=40",
        content:
          "Focus on what you're passionate about rather than your job title. People connect better with enthusiasm than credentials.",
        timestamp: "20 hours ago",
      },
      {
        id: 2,
        author: "Avery Thompson",
        authorImage: "/placeholder.svg?height=40&width=40",
        content:
          "Ask questions! People love talking about themselves and their work. It takes the pressure off you and helps build connections.",
        timestamp: "18 hours ago",
      },
    ],
  },
  {
    id: 4,
    title: "The future of AI in everyday applications",
    author: "Jordan Lee",
    authorImage: "/placeholder.svg?height=40&width=40",
    timestamp: "2 days ago",
    category: "technology",
    upvotes: 37,
    comments: 23,
    isAdmin: false,
    preview:
      "Beyond the obvious use cases, what are some interesting ways AI might be integrated into everyday applications in the next few years?",
    commentsList: [
      {
        id: 1,
        author: "Alex Chen",
        authorImage: "/placeholder.svg?height=40&width=40",
        content:
          "I think we'll see AI becoming more ambient - less visible but more helpful. Think smart homes that adjust to your preferences without explicit commands.",
        timestamp: "1 day ago",
      },
      {
        id: 2,
        author: "Taylor Wong",
        authorImage: "/placeholder.svg?height=40&width=40",
        content:
          "Healthcare is going to be transformed. AI-powered diagnostics and personalized treatment plans will become standard.",
        timestamp: "1 day ago",
      },
    ],
  },
  {
    id: 5,
    title: "Welcome to the forum! Introduce yourself",
    author: "Admin",
    authorImage: "/placeholder.svg?height=40&width=40",
    timestamp: "3 days ago",
    category: "general",
    upvotes: 15,
    comments: 42,
    isAdmin: true,
    preview:
      "Welcome to our community! This is a space for everyone to share ideas, ask questions, and connect with others. Feel free to introduce yourself in this thread.",
    commentsList: [
      {
        id: 1,
        author: "Jamie Smith",
        authorImage: "/placeholder.svg?height=40&width=40",
        content:
          "Hi everyone! I'm a frontend developer from Toronto. Looking forward to connecting with you all!",
        timestamp: "3 days ago",
      },
      {
        id: 2,
        author: "Casey Martinez",
        authorImage: "/placeholder.svg?height=40&width=40",
        content:
          "Hello! I'm a UX designer with a background in psychology. Excited to be part of this community!",
        timestamp: "2 days ago",
      },
    ],
  },
  {
    id: 6,
    title: "Minimalism vs. functionality in UI design",
    author: "Riley Johnson",
    authorImage: "/placeholder.svg?height=40&width=40",
    timestamp: "3 days ago",
    category: "design",
    upvotes: 29,
    comments: 18,
    isAdmin: false,
    preview:
      "How do you balance minimalistic design principles with the need for clear functionality? I find myself constantly struggling with this tension.",
    commentsList: [
      {
        id: 1,
        author: "Alex Chen",
        authorImage: "/placeholder.svg?height=40&width=40",
        content:
          "Progressive disclosure is key. Start with the essential functions visible, then reveal more as needed.",
        timestamp: "2 days ago",
      },
      {
        id: 2,
        author: "Taylor Wong",
        authorImage: "/placeholder.svg?height=40&width=40",
        content:
          "I think the best designs make functionality intuitive through visual hierarchy and thoughtful interaction design, not by adding more UI elements.",
        timestamp: "2 days ago",
      },
    ],
  },
  {
    id: 7,
    title: "TypeScript tips for large-scale applications",
    author: "Casey Martinez",
    authorImage: "/placeholder.svg?height=40&width=40",
    timestamp: "4 days ago",
    category: "development",
    upvotes: 31,
    comments: 14,
    isAdmin: false,
    preview:
      "I'm working on a large enterprise application and looking for advanced TypeScript patterns that help with maintainability and type safety. Any recommendations?",
    commentsList: [
      {
        id: 1,
        author: "Jamie Smith",
        authorImage: "/placeholder.svg?height=40&width=40",
        content:
          "Discriminated unions have been a game-changer for us. They make complex state management much more type-safe.",
        timestamp: "3 days ago",
      },
      {
        id: 2,
        author: "Jordan Lee",
        authorImage: "/placeholder.svg?height=40&width=40",
        content:
          "Don't underestimate the power of generics for creating reusable components and utilities. They're worth the learning curve.",
        timestamp: "3 days ago",
      },
    ],
  },
  {
    id: 8,
    title: "Networking strategies for remote developers",
    author: "Morgan Williams",
    authorImage: "/placeholder.svg?height=40&width=40",
    timestamp: "5 days ago",
    category: "career",
    upvotes: 22,
    comments: 19,
    isAdmin: false,
    preview:
      "As a fully remote developer, I sometimes feel disconnected from the broader tech community. What strategies have worked for you to build a professional network while working remotely?",
    commentsList: [
      {
        id: 1,
        author: "Taylor Wong",
        authorImage: "/placeholder.svg?height=40&width=40",
        content:
          "Virtual coffee chats have been invaluable for me. I schedule 30-minute calls with people in my field just to connect informally.",
        timestamp: "4 days ago",
      },
      {
        id: 2,
        author: "Riley Johnson",
        authorImage: "/placeholder.svg?height=40&width=40",
        content:
          "Contributing to open source projects has helped me build meaningful connections with developers worldwide.",
        timestamp: "4 days ago",
      },
    ],
  },
  {
    id: 9,
    title: "Thoughts on the new Apple Vision Pro?",
    author: "Avery Thompson",
    authorImage: "/placeholder.svg?height=40&width=40",
    timestamp: "6 days ago",
    category: "technology",
    upvotes: 45,
    comments: 31,
    isAdmin: false,
    preview:
      "Has anyone had a chance to try the Vision Pro? I'm curious about real-world applications beyond the demos we've seen so far.",
    commentsList: [
      {
        id: 1,
        author: "Jordan Lee",
        authorImage: "/placeholder.svg?height=40&width=40",
        content:
          "I tried it at a demo event. The spatial computing aspect is impressive, but I'm not convinced it's worth the price tag yet.",
        timestamp: "5 days ago",
      },
      {
        id: 2,
        author: "Casey Martinez",
        authorImage: "/placeholder.svg?height=40&width=40",
        content:
          "The potential for design and 3D modeling workflows is huge. I can see it becoming essential for certain creative professionals.",
        timestamp: "5 days ago",
      },
    ],
  },
  {
    id: 10,
    title: "Monthly check-in: How is everyone doing?",
    author: "Admin",
    authorImage: "/placeholder.svg?height=40&width=40",
    timestamp: "1 week ago",
    category: "general",
    upvotes: 19,
    comments: 27,
    isAdmin: true,
    preview:
      "It's that time of the month again! Let us know what you're working on, what you're excited about, or any challenges you're facing. We're here to support each other!",
    commentsList: [
      {
        id: 1,
        author: "Morgan Williams",
        authorImage: "/placeholder.svg?height=40&width=40",
        content:
          "Just wrapped up a major project and taking some time to learn about WebGPU. Anyone else exploring this?",
        timestamp: "6 days ago",
      },
      {
        id: 2,
        author: "Avery Thompson",
        authorImage: "/placeholder.svg?height=40&width=40",
        content:
          "Struggling with burnout lately. Would appreciate any tips on maintaining work-life balance in tech.",
        timestamp: "6 days ago",
      },
    ],
  },
];

// Splash screen component
// const SplashScreen = ({ onComplete }: { onComplete: () => void }) => {
//   useEffect(() => {
//     const timer = setTimeout(() => {
//       onComplete();
//     }, 2500);

//     return () => clearTimeout(timer);
//   }, [onComplete]);

//   return (
//     <div className="fixed inset-0 bg-black z-50 flex items-center justify-center">
//       <div className="text-center">
//         <h1 className="text-4xl md:text-6xl font-bold text-white opacity-0 animate-[fadeIn_1s_ease-in-out_forwards]">
//           Minimal Forum
//         </h1>
//         <div className="mt-4 h-1 w-0 bg-gradient-to-r from-blue-400 to-purple-500 mx-auto animate-[growWidth_1.5s_ease-in-out_forwards]"></div>
//       </div>
//     </div>
//   );
// };

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [threads, setThreads] = useState(initialThreads);
  const [isLoading, setIsLoading] = useState(false);
  const [openThreadId, setOpenThreadId] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOrder, setSortOrder] = useState<"latest" | "earliest">("latest");
  const [savedThreads, setSavedThreads] = useState<number[]>([]);
  const [showSavedPanel, setShowSavedPanel] = useState(false);
  const [upvotedThreads, setUpvotedThreads] = useState<number[]>([]);
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [showSplash, setShowSplash] = useState(true);
  const [newThreadData, setNewThreadData] = useState({
    title: "",
    content: "",
    category: "",
  });
  const [showAddThreadModal, setShowAddThreadModal] = useState(false);
  const { toast } = useToast();

  // Force theme on first load
  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
      document.documentElement.classList.remove("light");
    } else {
      document.documentElement.classList.add("light");
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  // Get current thread for sheet
  const currentThread = threads.find((thread) => thread.id === openThreadId);

  // Check URL for thread ID on load
  useEffect(() => {
    const url = new URL(window.location.href);
    const threadId = url.searchParams.get("thread");
    if (threadId) {
      const id = Number.parseInt(threadId);
      if (!isNaN(id) && threads.some((t) => t.id === id)) {
        setOpenThreadId(id);
      }
    }
  }, [threads]);

  // Update URL when thread is opened
  useEffect(() => {
    if (openThreadId) {
      const url = new URL(window.location.href);
      url.searchParams.set("thread", openThreadId.toString());
      window.history.pushState({}, "", url.toString());
    } else {
      const url = new URL(window.location.href);
      url.searchParams.delete("thread");
      window.history.pushState({}, "", url.toString());
    }
  }, [openThreadId]);

  // Filter and sort threads
  const filteredAndSortedThreads = threads
    .filter((thread) => {
      const matchesCategory = selectedCategory
        ? thread.category === selectedCategory
        : true;
      const matchesSearch = searchQuery
        ? thread.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          thread.preview.toLowerCase().includes(searchQuery.toLowerCase()) ||
          thread.author.toLowerCase().includes(searchQuery.toLowerCase())
        : true;
      return matchesCategory && matchesSearch;
    })
    .sort((a, b) => {
      // First sort by admin status (admin threads first)
      if (a.isAdmin && !b.isAdmin) return -1;
      if (!a.isAdmin && b.isAdmin) return 1;

      // Then sort by timestamp
      const aTime = new Date(a.timestamp).getTime();
      const bTime = new Date(b.timestamp).getTime();

      if (sortOrder === "latest") {
        return bTime - aTime;
      } else {
        return aTime - bTime;
      }
    });

  // Get saved threads
  const savedThreadsList = threads.filter((thread) =>
    savedThreads.includes(thread.id)
  );

  // Handle category selection
  const handleCategorySelect = (slug: string) => {
    if (selectedCategory === slug) {
      setSelectedCategory(null);
      return;
    }

    setIsLoading(true);
    setSelectedCategory(slug);

    // Simulate loading delay
    setTimeout(() => {
      setIsLoading(false);
    }, 600);
  };

  // Handle upvote
  const handleUpvote = (id: number) => {
    if (upvotedThreads.includes(id)) {
      // Remove upvote
      setUpvotedThreads(upvotedThreads.filter((threadId) => threadId !== id));
      setThreads(
        threads.map((thread) =>
          thread.id === id ? { ...thread, upvotes: thread.upvotes - 1 } : thread
        )
      );
    } else {
      // Add upvote
      setUpvotedThreads([...upvotedThreads, id]);
      setThreads(
        threads.map((thread) =>
          thread.id === id ? { ...thread, upvotes: thread.upvotes + 1 } : thread
        )
      );
    }
  };

  // Handle save thread
  const handleSaveThread = (id: number) => {
    if (savedThreads.includes(id)) {
      // Unsave
      setSavedThreads(savedThreads.filter((threadId) => threadId !== id));
      toast({
        title: "Thread removed from saved",
        description: "The thread has been removed from your saved list",
      });
    } else {
      // Save
      setSavedThreads([...savedThreads, id]);
      toast({
        title: "Thread saved",
        description: "The thread has been added to your saved list",
      });
    }
  };

  // Handle share thread
  const handleShareThread = (id: number) => {
    const url = new URL(window.location.href);
    url.searchParams.set("thread", id.toString());
    navigator.clipboard.writeText(url.toString());

    toast({
      title: "Link copied",
      description: "Thread link has been copied to clipboard",
    });
  };

  // Handle add new thread
  const handleAddThread = () => {
    if (
      !newThreadData.title ||
      !newThreadData.content ||
      !newThreadData.category
    ) {
      toast({
        title: "Missing information",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }

    const newThread = {
      id: threads.length + 1,
      title: newThreadData.title,
      author: "You",
      authorImage: "/placeholder.svg?height=40&width=40",
      timestamp: "Just now",
      category: newThreadData.category,
      upvotes: 0,
      comments: 0,
      isAdmin: false,
      preview: newThreadData.content,
      commentsList: [],
    };

    setThreads([newThread, ...threads]);
    setNewThreadData({ title: "", content: "", category: "" });
    setShowAddThreadModal(false);

    toast({
      title: "Thread created!",
      description: "Your new thread has been posted successfully",
    });
  };

  // Get category color
  const getCategoryColor = (slug: string) => {
    return categories.find((c) => c.slug === slug)?.color || "bg-gray-500";
  };

  // Get initials for avatar fallback
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  if (showSplash) {
    return <SplashScreen onComplete={() => setShowSplash(false)} />;
  }

  return (
    <ThemeProvider defaultTheme={theme} forcedTheme={theme}>
      <div
        className={cn(
          "min-h-screen flex flex-col",
          theme === "dark"
            ? "bg-[#0F172A] text-white"
            : "bg-[#F8F9FC] text-[#1E293B]"
        )}
      >
        <header
          className={cn(
            "sticky top-0 z-10 backdrop-blur-md py-4 px-4 sm:px-6 border-b",
            theme === "dark"
              ? "bg-[#0F172A]/80 border-[#1E293B]"
              : "bg-[#F8F9FC]/80 border-[#E2E8F0]"
          )}
        >
          <div className="max-w-6xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center mr-3">
                <span className="font-bold text-white">MF</span>
              </div>
              <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
                Minimal Forum
              </h1>
            </div>

            <div className="flex items-center gap-4 md:justify-end justify-between md:w-fit w-full">
              <div className="relative w-full max-w-md">
                <Search
                  className={cn(
                    "absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4",
                    theme === "dark" ? "text-gray-400" : "text-gray-500"
                  )}
                />
                <Input
                  placeholder="Search discussions..."
                  className={cn(
                    "pl-10",
                    theme === "dark"
                      ? "bg-[#1E293B] border-[#2D3748] focus-visible:ring-purple-500"
                      : "bg-white border-[#E2E8F0] focus-visible:ring-blue-500"
                  )}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className={cn(
                        theme === "dark"
                          ? "text-gray-400 hover:text-white"
                          : "text-gray-500 hover:text-gray-900",
                        "md:flex hidden items-center justify-center"
                      )}
                      onClick={() => setShowSavedPanel(!showSavedPanel)}
                    >
                      <Bookmark className="h-7 w-7" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent side="bottom">
                    <p>Saved Threads</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>

              <div className="flex items-center gap-2">
                <SunMedium
                  className={cn(
                    "h-4 w-4",
                    theme === "dark" ? "text-gray-400" : "text-amber-500"
                  )}
                />
                <Switch
                  checked={theme === "dark"}
                  onCheckedChange={(checked) =>
                    setTheme(checked ? "dark" : "light")
                  }
                  className={cn(
                    theme === "dark"
                      ? "bg-[#1E293B] data-[state=checked]:bg-purple-600"
                      : "bg-gray-200 data-[state=checked]:bg-blue-600"
                  )}
                />
                <Moon
                  className={cn(
                    "h-4 w-4",
                    theme === "dark" ? "text-blue-400" : "text-gray-400"
                  )}
                />
              </div>
            </div>
          </div>
        </header>

        <div className="flex flex-1">
          {/* Main content */}
          <main
            className={cn(
              "flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 py-8",
              showSavedPanel ? "mr-[25%] transition-all duration-300" : ""
            )}
          >
            {/* Categories as Tabs */}
            <div className="flex md:flex-row flex-col items-top justify-between mb-6">
              <Tabs
                defaultValue="all"
                value={selectedCategory || "all"}
                onValueChange={(value) =>
                  value === "all"
                    ? setSelectedCategory(null)
                    : handleCategorySelect(value)
                }
                className="w-full flex justify-center md:block md:justify-start"
              >
                <TabsList
                  className={cn(
                    "p-2 mb-2 ",
                    theme === "dark"
                      ? "bg-[#1E293B]"
                      : "bg-white border border-[#E2E8F0]"
                  )}
                >
                  <TabsTrigger
                    value="all"
                    className={cn(
                      theme === "dark"
                        ? "data-[state=active]:bg-[#2D3748] data-[state=active]:text-white"
                        : "data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700",
                      "md:text-sm text-xs md:px-3 px-2"
                    )}
                  >
                    All
                  </TabsTrigger>
                  {categories.map((category) => (
                    <TabsTrigger
                      key={category.id}
                      value={category.slug}
                      className={cn(
                        theme === "dark"
                          ? "data-[state=active]:bg-[#2D3748] data-[state=active]:text-white"
                          : "data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700",
                        "md:text-sm text-xs md:px-3 px-2"
                      )}
                    >
                      {category.name}
                    </TabsTrigger>
                  ))}
                </TabsList>
              </Tabs>

              <div className="flex md:items-start items-center justify-center gap-2">
                <Dialog
                  open={showAddThreadModal}
                  onOpenChange={setShowAddThreadModal}
                >
                  <DialogTrigger asChild>
                    <Button
                      size={"sm"}
                      className={cn(
                        "gap-1",
                        theme === "dark"
                          ? "bg-blue-600 hover:bg-blue-700"
                          : "bg-blue-500 hover:bg-blue-600",
                        "flex items-center justify-center font-semibold text-gray-300"
                      )}
                    >
                      <span className="text-sm md:text-md">+</span>
                      <span className="text-xs md:text-sm"> New Thread</span>
                    </Button>
                  </DialogTrigger>
                  <DialogContent
                    className={
                      theme === "dark"
                        ? "bg-[#1E293B] border-[#2D3748]"
                        : "bg-white"
                    }
                  >
                    <DialogHeader>
                      <DialogTitle
                        className={
                          theme === "dark" ? "text-white" : "text-gray-900"
                        }
                      >
                        Create New Thread
                      </DialogTitle>
                      <DialogDescription
                        className={
                          theme === "dark" ? "text-gray-400" : "text-gray-500"
                        }
                      >
                        Share your thoughts, questions, or ideas with the
                        community.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                      <div className="space-y-2">
                        <Label
                          htmlFor="title"
                          className={
                            theme === "dark" ? "text-gray-200" : "text-gray-700"
                          }
                        >
                          Title
                        </Label>
                        <Input
                          id="title"
                          placeholder="Enter a descriptive title"
                          value={newThreadData.title}
                          onChange={(e) =>
                            setNewThreadData({
                              ...newThreadData,
                              title: e.target.value,
                            })
                          }
                          className={
                            theme === "dark"
                              ? "bg-[#2D3748] border-[#4A5568]"
                              : "bg-white border-gray-200"
                          }
                        />
                      </div>
                      <div className="space-y-2">
                        <Label
                          htmlFor="category"
                          className={
                            theme === "dark" ? "text-gray-200" : "text-gray-700"
                          }
                        >
                          Category
                        </Label>
                        <Select
                          value={newThreadData.category}
                          onValueChange={(value) =>
                            setNewThreadData({
                              ...newThreadData,
                              category: value,
                            })
                          }
                        >
                          <SelectTrigger
                            className={
                              theme === "dark"
                                ? "bg-[#2D3748] border-[#4A5568]"
                                : "bg-white border-gray-200"
                            }
                          >
                            <SelectValue placeholder="Select a category" />
                          </SelectTrigger>
                          <SelectContent
                            className={
                              theme === "dark"
                                ? "bg-[#2D3748] border-[#4A5568]"
                                : "bg-white border-gray-200"
                            }
                          >
                            {categories.map((category) => (
                              <SelectItem
                                key={category.id}
                                value={category.slug}
                              >
                                {category.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label
                          htmlFor="content"
                          className={
                            theme === "dark" ? "text-gray-200" : "text-gray-700"
                          }
                        >
                          Content
                        </Label>
                        <Textarea
                          id="content"
                          placeholder="Write your thread content here..."
                          rows={5}
                          value={newThreadData.content}
                          onChange={(e) =>
                            setNewThreadData({
                              ...newThreadData,
                              content: e.target.value,
                            })
                          }
                          className={
                            theme === "dark"
                              ? "bg-[#2D3748] border-[#4A5568]"
                              : "bg-white border-gray-200"
                          }
                        />
                      </div>
                    </div>
                    <DialogFooter>
                      <Button
                        variant="outline"
                        onClick={() => setShowAddThreadModal(false)}
                        className={
                          theme === "dark"
                            ? "bg-[#2D3748] border-[#4A5568] hover:bg-[#3A4A63]"
                            : "bg-white hover:bg-gray-50"
                        }
                      >
                        Cancel
                      </Button>
                      <Button
                        onClick={handleAddThread}
                        className={
                          theme === "dark"
                            ? "bg-blue-600 hover:bg-blue-700"
                            : "bg-blue-500 hover:bg-blue-600"
                        }
                      >
                        Post Thread
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            </div>

            {/* Threads */}
            <div className="space-y-4">
              <div className="flex justify-between items-center mb-6">
                <h2
                  className={cn(
                    "text-2xl font-bold bg-clip-text text-transparent",
                    theme === "dark"
                      ? "bg-gradient-to-r from-blue-400 to-purple-500"
                      : "bg-gradient-to-r from-blue-600 to-purple-600"
                  )}
                >
                  {selectedCategory
                    ? `${
                        categories.find((c) => c.slug === selectedCategory)
                          ?.name
                      } Discussions`
                    : "All Discussions"}
                </h2>
                <Badge
                  variant="outline"
                  className={cn(
                    "text-xs",
                    theme === "dark" ? "border-[#2D3748]" : "border-[#E2E8F0]"
                  )}
                >
                  {filteredAndSortedThreads.length} threads
                </Badge>
              </div>

              {isLoading ? (
                // Loading skeletons
                <div className="space-y-4">
                  {[1, 2, 3, 4].map((i) => (
                    <Card
                      key={i}
                      className={
                        theme === "dark"
                          ? "bg-[#1E293B] border-[#2D3748]"
                          : "bg-white border-[#E2E8F0]"
                      }
                    >
                      <CardHeader className="pb-2">
                        <div className="flex justify-between items-start">
                          <div className="flex items-center gap-3">
                            <Skeleton
                              className={cn(
                                "h-10 w-10 rounded-full",
                                theme === "dark"
                                  ? "bg-[#2D3748]"
                                  : "bg-gray-200"
                              )}
                            />
                            <div>
                              <Skeleton
                                className={cn(
                                  "h-5 w-40",
                                  theme === "dark"
                                    ? "bg-[#2D3748]"
                                    : "bg-gray-200"
                                )}
                              />
                              <Skeleton
                                className={cn(
                                  "h-4 w-24 mt-2",
                                  theme === "dark"
                                    ? "bg-[#2D3748]"
                                    : "bg-gray-200"
                                )}
                              />
                            </div>
                          </div>
                          <Skeleton
                            className={cn(
                              "h-8 w-8 rounded-full",
                              theme === "dark" ? "bg-[#2D3748]" : "bg-gray-200"
                            )}
                          />
                        </div>
                      </CardHeader>
                      <CardContent>
                        <Skeleton
                          className={cn(
                            "h-4 w-full mt-2",
                            theme === "dark" ? "bg-[#2D3748]" : "bg-gray-200"
                          )}
                        />
                        <Skeleton
                          className={cn(
                            "h-4 w-3/4 mt-2",
                            theme === "dark" ? "bg-[#2D3748]" : "bg-gray-200"
                          )}
                        />
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="grid grid-cols-1 gap-4">
                  {filteredAndSortedThreads.map((thread) => (
                    <Card
                      key={thread.id}
                      className={cn(
                        "overflow-hidden group transition-all duration-200",
                        thread.isAdmin && "border-l-4",
                        theme === "dark"
                          ? "bg-[#1E293B] border-[#2D3748]  " +
                              (thread.isAdmin
                                ? "md:hover:border-l-blue-500"
                                : "")
                          : "bg-white border-[#E2E8F0]  hover:shadow-sm " +
                              (thread.isAdmin
                                ? "md:hover:border-l-blue-500"
                                : "")
                      )}
                    >
                      <CardHeader className="pb-2">
                        <div className="flex justify-between items-start">
                          <div className="flex items-center gap-3">
                            <Avatar>
                              <AvatarImage
                                src={"https://avatar.iran.liara.run/public"}
                                alt={thread.author}
                              />
                              <AvatarFallback
                                className={
                                  theme === "dark"
                                    ? "bg-[#2D3748]"
                                    : "bg-gray-100"
                                }
                              >
                                {getInitials(thread.author)}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="flex items-center gap-2">
                                <span
                                  className={cn(
                                    "font-medium",
                                    thread.isAdmin && "text-blue-500"
                                  )}
                                >
                                  {thread.author}
                                </span>
                                <span
                                  className={
                                    theme === "dark"
                                      ? "text-xs text-gray-400"
                                      : "text-xs text-gray-500"
                                  }
                                >
                                  •
                                </span>
                                <span
                                  className={
                                    theme === "dark"
                                      ? "text-xs text-gray-400"
                                      : "text-xs text-gray-500"
                                  }
                                >
                                  {thread.timestamp}
                                </span>
                              </div>
                              <div
                                className={`mt-1 ${getCategoryColor(
                                  thread.category
                                )} text-white text-xs flex w-fit px-1 py-[1.2px] font-semibold rounded-xl justify-center items-center`}
                              >
                                {
                                  categories.find(
                                    (c) => c.slug === thread.category
                                  )?.name
                                }
                              </div>
                            </div>
                          </div>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button
                                variant="ghost"
                                size="icon"
                                className={cn(
                                  "h-8 w-8",
                                  theme === "dark"
                                    ? "text-gray-400 hover:text-white"
                                    : "text-gray-500 hover:text-gray-900"
                                )}
                              >
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent
                              align="end"
                              className={
                                theme === "dark"
                                  ? "bg-[#2D3748] border-[#4A5568]"
                                  : "bg-white border-[#E2E8F0]"
                              }
                            >
                              <DropdownMenuItem
                                onClick={() => handleSaveThread(thread.id)}
                                className={cn(
                                  "flex items-center gap-2",
                                  theme === "dark"
                                    ? "text-gray-200 focus:text-white focus:bg-[#3A4A63]"
                                    : "text-gray-700 focus:text-gray-900 focus:bg-gray-100"
                                )}
                              >
                                <Bookmark
                                  className={cn(
                                    "mr-2 h-4 w-4",
                                    savedThreads.includes(thread.id) &&
                                      "fill-current"
                                  )}
                                />
                                {savedThreads.includes(thread.id)
                                  ? "Unsave"
                                  : "Save"}
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={() => handleShareThread(thread.id)}
                                className={cn(
                                  "flex items-center gap-2",
                                  theme === "dark"
                                    ? "text-gray-200 focus:text-white focus:bg-[#3A4A63]"
                                    : "text-gray-700 focus:text-gray-900 focus:bg-gray-100"
                                )}
                              >
                                <Share2 className="mr-2 h-4 w-4" /> Share
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </CardHeader>
                      <CardContent
                        className="cursor-pointer pt-2"
                        onClick={() => setOpenThreadId(thread.id)}
                      >
                        <h3
                          className={cn(
                            "text-lg font-semibold mb-2 transition-colors",
                            theme === "dark"
                              ? "group-hover:text-blue-400"
                              : "group-hover:text-blue-600"
                          )}
                        >
                          {thread.title}
                        </h3>
                        <p
                          className={
                            theme === "dark"
                              ? "text-gray-300 text-sm line-clamp-2"
                              : "text-gray-600 text-sm line-clamp-2"
                          }
                        >
                          {thread.preview}
                        </p>
                      </CardContent>
                      <CardFooter
                        className={cn(
                          "border-t pt-3 flex justify-between",
                          theme === "dark"
                            ? "border-[#2D3748]"
                            : "border-[#E2E8F0]"
                        )}
                      >
                        <div className="flex items-center gap-6">
                          <Button
                            variant="ghost"
                            size="sm"
                            className={cn(
                              "gap-2 px-2",
                              theme === "dark"
                                ? "text-gray-400 hover:text-blue-400 hover:bg-[#2D3748]"
                                : "text-gray-500 hover:text-blue-600 hover:bg-gray-100"
                            )}
                            onClick={() => setOpenThreadId(thread.id)}
                          >
                            <MessageSquare className="h-4 w-4" />
                            <span>{thread.comments}</span>
                          </Button>
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className={cn(
                                    "gap-2 px-2",
                                    theme === "dark"
                                      ? "text-gray-400 hover:text-blue-400 hover:bg-[#2D3748]"
                                      : "text-gray-500 hover:text-blue-600 hover:bg-gray-100"
                                  )}
                                  onClick={() => handleShareThread(thread.id)}
                                >
                                  <Share2 className="h-4 w-4" />
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent
                                side="bottom"
                                className={
                                  theme === "dark"
                                    ? "bg-[#2D3748] border-[#4A5568]"
                                    : "bg-white border-[#E2E8F0]"
                                }
                              >
                                <p>Share this thread</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        </div>
                        <Button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleUpvote(thread.id);
                          }}
                          variant="ghost"
                          size="sm"
                          className={cn(
                            "gap-2 px-3",
                            upvotedThreads.includes(thread.id)
                              ? theme === "dark"
                                ? "text-blue-400 bg-[#1E293B]/50"
                                : "text-blue-600 bg-blue-50"
                              : theme === "dark"
                              ? "text-gray-400 hover:text-blue-400 hover:bg-[#2D3748]"
                              : "text-gray-500 hover:text-blue-600 hover:bg-gray-100"
                          )}
                        >
                          <ChevronUp className="h-4 w-4" />
                          <span>{thread.upvotes}</span>
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          </main>

          {/* Saved Threads Panel */}
          <aside
            className={cn(
              "fixed top-[73px] right-0 bottom-0 w-[25%] overflow-auto transition-all duration-300 border-l p-4",
              theme === "dark"
                ? "bg-[#1E293B] border-[#2D3748]"
                : "bg-white border-[#E2E8F0]",
              showSavedPanel ? "translate-x-0" : "translate-x-full"
            )}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <Bookmark className="h-5 w-5" /> Saved Threads
              </h3>
              <Button
                variant="ghost"
                size="icon"
                className={
                  theme === "dark"
                    ? "text-gray-400 hover:text-white"
                    : "text-gray-500 hover:text-gray-900"
                }
                onClick={() => setShowSavedPanel(false)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>

            {savedThreads.length === 0 ? (
              <div
                className={cn(
                  "text-center py-8",
                  theme === "dark" ? "text-gray-400" : "text-gray-500"
                )}
              >
                <Bookmark className="h-12 w-12 mx-auto mb-2 opacity-20" />
                <p>No saved threads yet</p>
                <p className="text-sm mt-1">
                  Threads you save will appear here
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {savedThreadsList.map((thread) => (
                  <div
                    key={thread.id}
                    className={cn(
                      "p-3 rounded-md cursor-pointer",
                      theme === "dark"
                        ? "bg-[#2D3748] hover:bg-[#3A4A63]"
                        : "bg-gray-50 hover:bg-gray-100"
                    )}
                    onClick={() => setOpenThreadId(thread.id)}
                  >
                    <div className="flex justify-between items-start">
                      <h4 className="font-medium text-sm line-clamp-2">
                        {thread.title}
                      </h4>
                      <Button
                        variant="ghost"
                        size="icon"
                        className={cn(
                          "h-6 w-6 ml-1 shrink-0",
                          theme === "dark"
                            ? "text-gray-400 hover:text-white"
                            : "text-gray-500 hover:text-gray-900"
                        )}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleSaveThread(thread.id);
                        }}
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </div>
                    <div className="flex items-center gap-2 mt-2">
                      <Badge
                        variant="secondary"
                        className={`${getCategoryColor(
                          thread.category
                        )} text-white text-xs`}
                      >
                        {
                          categories.find((c) => c.slug === thread.category)
                            ?.name
                        }
                      </Badge>
                      <span
                        className={
                          theme === "dark"
                            ? "text-xs text-gray-400"
                            : "text-xs text-gray-500"
                        }
                      >
                        {thread.upvotes} upvotes
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </aside>
        </div>

        <footer
          className={cn(
            "py-6 px-4 sm:px-6 border-t",
            theme === "dark"
              ? "border-[#1E293B] bg-[#0F172A]"
              : "border-[#E2E8F0] bg-[#F8F9FC]"
          )}
        >
          <div className="max-w-6xl mx-auto text-center text-sm flex flex-col items-center justify-center gap-2 ">
            <p className={theme === "dark" ? "text-gray-400" : "text-gray-500"}>
              Minimal Forum © {new Date().getFullYear()}
            </p>
            <div className="gap-2 flex w-fit">
              <a href="https://linkedin.com/in/jjinendra3" target="_blank">
                <Linkedin className="h-4 w-4 text-gray-500 hover:text-white cursor-pointer" />
              </a>
              <a href="https://github.com/jjinendra3" target="_blank">
                <GithubIcon className="h-4 w-4 text-gray-500 hover:text-white cursor-pointer" />
              </a>
            </div>
          </div>
        </footer>

        {/* Thread Detail Sheet */}
        <Sheet
          open={openThreadId !== null}
          onOpenChange={(open) => !open && setOpenThreadId(null)}
        >
          <SheetContent
            className={cn(
              "w-full sm:max-w-lg md:max-w-xl lg:max-w-2xl p-0 border-l",
              theme === "dark"
                ? "bg-[#1E293B] border-[#2D3748]"
                : "bg-white border-[#E2E8F0]"
            )}
            side="right"
          >
            {currentThread && (
              <div className="flex flex-col h-full">
                <SheetHeader
                  className={cn(
                    "p-6 border-b",
                    theme === "dark" ? "border-[#2D3748]" : "border-[#E2E8F0]"
                  )}
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage
                          src={"https://avatar.iran.liara.run/public"}
                          alt={currentThread.author}
                        />
                        <AvatarFallback
                          className={
                            theme === "dark" ? "bg-[#2D3748]" : "bg-gray-100"
                          }
                        >
                          {getInitials(currentThread.author)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex flex-col">
                        <div className="flex items-center gap-2">
                          <span
                            className={cn(
                              "font-medium",
                              currentThread.isAdmin && "text-blue-500"
                            )}
                          >
                            {currentThread.author}
                          </span>
                          <span
                            className={
                              theme === "dark"
                                ? "text-xs text-gray-400"
                                : "text-xs text-gray-500"
                            }
                          >
                            •
                          </span>
                          <span
                            className={
                              theme === "dark"
                                ? "text-xs text-gray-400"
                                : "text-xs text-gray-500"
                            }
                          >
                            {currentThread.timestamp}
                          </span>
                        </div>
                        <Badge
                          className={`mt-1 ${getCategoryColor(
                            currentThread.category
                          )} text-white w-fit`}
                          variant="secondary"
                        >
                          {
                            categories.find(
                              (c) => c.slug === currentThread.category
                            )?.name
                          }
                        </Badge>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              variant="ghost"
                              size="icon"
                              className={
                                theme === "dark"
                                  ? "text-gray-400 hover:text-white"
                                  : "text-gray-500 hover:text-gray-900"
                              }
                              onClick={() => handleSaveThread(currentThread.id)}
                            >
                              <Bookmark
                                className={cn(
                                  "h-4 w-4",
                                  savedThreads.includes(currentThread.id) &&
                                    "fill-current"
                                )}
                              />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent side="bottom">
                            <p>
                              {savedThreads.includes(currentThread.id)
                                ? "Unsave"
                                : "Save"}{" "}
                              thread
                            </p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>

                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              variant="ghost"
                              size="icon"
                              className={
                                theme === "dark"
                                  ? "text-gray-400 hover:text-white"
                                  : "text-gray-500 hover:text-gray-900"
                              }
                              onClick={() =>
                                handleShareThread(currentThread.id)
                              }
                            >
                              <Copy className="h-4 w-4" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent side="bottom">
                            <p>Copy link</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>

                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              variant="ghost"
                              size="icon"
                              className={
                                theme === "dark"
                                  ? "text-gray-400 hover:text-white"
                                  : "text-gray-500 hover:text-gray-900"
                              }
                              onClick={() => {
                                const url = new URL(window.location.href);
                                window.open(url.toString(), "_blank");
                              }}
                            >
                              <ExternalLink className="h-4 w-4" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent side="bottom">
                            <p>Open in new tab</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                  </div>
                  <SheetTitle
                    className={cn(
                      "text-xl font-bold text-left",
                      theme === "dark" ? "text-white" : "text-gray-900"
                    )}
                  >
                    {currentThread.title}
                  </SheetTitle>
                  <SheetDescription
                    className={cn(
                      "text-left mt-2",
                      theme === "dark" ? "text-gray-300" : "text-gray-600"
                    )}
                  >
                    {currentThread.preview}
                  </SheetDescription>
                  <div className="flex items-center justify-between mt-4">
                    <div className="flex items-center gap-4">
                      <Button
                        onClick={() => handleUpvote(currentThread.id)}
                        variant="ghost"
                        size="sm"
                        className={cn(
                          "gap-2",
                          upvotedThreads.includes(currentThread.id)
                            ? theme === "dark"
                              ? "text-blue-400 bg-[#1E293B]/50"
                              : "text-blue-600 bg-blue-50"
                            : theme === "dark"
                            ? "text-gray-400 hover:text-blue-400 hover:bg-[#2D3748]"
                            : "text-gray-500 hover:text-blue-600 hover:bg-gray-100"
                        )}
                      >
                        <ChevronUp className="h-4 w-4" />
                        <span>{currentThread.upvotes}</span>
                      </Button>
                      <div
                        className={cn(
                          "flex items-center gap-2",
                          theme === "dark" ? "text-gray-400" : "text-gray-500"
                        )}
                      >
                        <MessageSquare className="h-4 w-4" />
                        <span>{currentThread.comments}</span>
                      </div>
                    </div>
                  </div>
                </SheetHeader>

                <div className="flex-1 overflow-auto p-6">
                  <h3
                    className={cn(
                      "text-lg font-semibold mb-4",
                      theme === "dark" ? "text-white" : "text-gray-900"
                    )}
                  >
                    Comments
                  </h3>
                  <div className="space-y-6">
                    {currentThread.commentsList.map((comment) => (
                      <div
                        key={comment.id}
                        className={cn(
                          "rounded-lg p-4",
                          theme === "dark" ? "bg-[#2D3748]" : "bg-gray-50"
                        )}
                      >
                        <div className="flex items-center gap-3 mb-2">
                          <Avatar className="h-8 w-8">
                            <AvatarImage
                              src={"https://avatar.iran.liara.run/public"}
                              alt={comment.author}
                            />
                            <AvatarFallback
                              className={
                                theme === "dark"
                                  ? "bg-[#3A4A63] text-xs"
                                  : "bg-gray-200 text-xs"
                              }
                            >
                              {getInitials(comment.author)}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="font-medium text-sm">
                                {comment.author}
                              </span>
                              <span
                                className={
                                  theme === "dark"
                                    ? "text-xs text-gray-400"
                                    : "text-xs text-gray-500"
                                }
                              >
                                •
                              </span>
                              <span
                                className={
                                  theme === "dark"
                                    ? "text-xs text-gray-400"
                                    : "text-xs text-gray-500"
                                }
                              >
                                {comment.timestamp}
                              </span>
                            </div>
                          </div>
                        </div>
                        <p
                          className={
                            theme === "dark"
                              ? "text-gray-200 text-sm"
                              : "text-gray-700 text-sm"
                          }
                        >
                          {comment.content}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                <SheetFooter
                  className={cn(
                    "p-4 border-t",
                    theme === "dark" ? "border-[#2D3748]" : "border-[#E2E8F0]"
                  )}
                >
                  <div className="w-full h-12 flex justify-center items-center  gap-2">
                    <Input
                      placeholder="Add a comment..."
                      className={cn(
                        theme === "dark"
                          ? "bg-[#2D3748] border-[#4A5568] focus-visible:ring-blue-500 w-full"
                          : "bg-white border-[#E2E8F0] focus-visible:ring-blue-500 w-full",
                        "h-10"
                      )}
                    />
                    <div className="flex justify-center items-center">
                      <Button
                        className={cn(
                          theme === "dark"
                            ? "bg-blue-600 hover:bg-blue-700"
                            : "bg-blue-500 hover:bg-blue-600",
                          "h-10"
                        )}
                      >
                        <Rocket className="text-white h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </SheetFooter>
              </div>
            )}
          </SheetContent>
        </Sheet>
      </div>
    </ThemeProvider>
  );
}
