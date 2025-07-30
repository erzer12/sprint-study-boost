import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { 
  BookOpen, Clock, RotateCcw, Play, Pause, SkipForward, 
  FileText, Target, CheckCircle 
} from 'lucide-react';

const Study = () => {
  const [timerSeconds, setTimerSeconds] = useState(25 * 60); // 25 minutes
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [currentCard, setCurrentCard] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);

  // Sample flashcards data
  const flashcards = [
    {
      question: "What is the quadratic formula?",
      answer: "x = (-b ± √(b² - 4ac)) / 2a",
      subject: "Mathematics",
      difficulty: "Medium"
    },
    {
      question: "Define photosynthesis",
      answer: "The process by which plants convert light energy into chemical energy (glucose) using carbon dioxide and water.",
      subject: "Biology", 
      difficulty: "Easy"
    },
    {
      question: "What year did World War II end?",
      answer: "1945",
      subject: "History",
      difficulty: "Easy"
    }
  ];

  // Sample notes data
  const notes = [
    {
      title: "Chemical Bonding Summary",
      subject: "Chemistry",
      content: "Ionic bonds form between metals and non-metals through electron transfer. Covalent bonds form between non-metals through electron sharing.",
      lastModified: "2 hours ago"
    },
    {
      title: "Shakespearean Sonnets",
      subject: "English",
      content: "14 lines, ABAB CDCD EFEF GG rhyme scheme. Usually written in iambic pentameter with a volta around line 9.",
      lastModified: "1 day ago"
    }
  ];

  // Timer effect
  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isTimerRunning && timerSeconds > 0) {
      interval = setInterval(() => {
        setTimerSeconds(seconds => seconds - 1);
      }, 1000);
    } else if (timerSeconds === 0) {
      setIsTimerRunning(false);
      // Could add notification here
    }

    return () => clearInterval(interval);
  }, [isTimerRunning, timerSeconds]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const toggleTimer = () => {
    setIsTimerRunning(!isTimerRunning);
  };

  const resetTimer = () => {
    setIsTimerRunning(false);
    setTimerSeconds(25 * 60);
  };

  const nextCard = () => {
    setCurrentCard((prev) => (prev + 1) % flashcards.length);
    setShowAnswer(false);
  };

  const prevCard = () => {
    setCurrentCard((prev) => (prev - 1 + flashcards.length) % flashcards.length);
    setShowAnswer(false);
  };

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Target className="w-8 h-8 text-primary" />
            <h1 className="text-3xl font-bold text-foreground">Study Session</h1>
          </div>
          <p className="text-muted-foreground">
            Focus on your studies with flashcards, notes, and productivity tools
          </p>
        </div>

        <Tabs defaultValue="flashcards" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="flashcards" className="flex items-center gap-2">
              <BookOpen className="w-4 h-4" />
              Flashcards
            </TabsTrigger>
            <TabsTrigger value="notes" className="flex items-center gap-2">
              <FileText className="w-4 h-4" />
              Notes
            </TabsTrigger>
            <TabsTrigger value="timer" className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              Study Timer
            </TabsTrigger>
          </TabsList>

          {/* Flashcards Tab */}
          <TabsContent value="flashcards" className="space-y-6">
            <div className="max-w-2xl mx-auto">
              <Card className="min-h-[400px]">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Flashcard {currentCard + 1} of {flashcards.length}</CardTitle>
                    <Badge variant="outline">
                      {flashcards[currentCard]?.subject}
                    </Badge>
                  </div>
                  <CardDescription>
                    Difficulty: {flashcards[currentCard]?.difficulty}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="text-center py-8">
                    {!showAnswer ? (
                      <div>
                        <h3 className="text-xl font-semibold mb-4">Question:</h3>
                        <p className="text-lg text-muted-foreground">
                          {flashcards[currentCard]?.question}
                        </p>
                      </div>
                    ) : (
                      <div>
                        <h3 className="text-xl font-semibold mb-4 text-success">Answer:</h3>
                        <p className="text-lg">
                          {flashcards[currentCard]?.answer}
                        </p>
                      </div>
                    )}
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    {!showAnswer ? (
                      <Button onClick={() => setShowAnswer(true)} size="lg">
                        Show Answer
                      </Button>
                    ) : (
                      <>
                        <Button onClick={prevCard} variant="outline">
                          Previous
                        </Button>
                        <Button onClick={nextCard} variant="outline">
                          <SkipForward className="w-4 h-4 mr-2" />
                          Next Card
                        </Button>
                      </>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Notes Tab */}
          <TabsContent value="notes" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              {notes.map((note, index) => (
                <Card key={index}>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <CardTitle className="text-lg">{note.title}</CardTitle>
                      <Badge variant="secondary">{note.subject}</Badge>
                    </div>
                    <CardDescription>
                      Last modified: {note.lastModified}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {note.content}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Card className="border-dashed">
              <CardContent className="text-center py-12">
                <FileText className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Create Your First Note</h3>
                <p className="text-muted-foreground mb-4">
                  Start taking notes to organize your study materials
                </p>
                <Button>
                  <FileText className="w-4 h-4 mr-2" />
                  Add Note
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Timer Tab */}
          <TabsContent value="timer" className="space-y-6">
            <div className="max-w-lg mx-auto">
              <Card className="text-center">
                <CardHeader>
                  <CardTitle className="flex items-center justify-center gap-2">
                    <Clock className="w-6 h-6 text-primary" />
                    Pomodoro Timer
                  </CardTitle>
                  <CardDescription>
                    25-minute focused study sessions with 5-minute breaks
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-8">
                  <div className="py-8">
                    <div className="text-6xl font-mono font-bold text-primary mb-4">
                      {formatTime(timerSeconds)}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {timerSeconds > 0 ? 'Focus Time' : 'Time for a break!'}
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button 
                      onClick={toggleTimer} 
                      size="lg"
                      variant={isTimerRunning ? "outline" : "default"}
                    >
                      {isTimerRunning ? (
                        <>
                          <Pause className="w-4 h-4 mr-2" />
                          Pause
                        </>
                      ) : (
                        <>
                          <Play className="w-4 h-4 mr-2" />
                          Start
                        </>
                      )}
                    </Button>
                    <Button onClick={resetTimer} variant="outline" size="lg">
                      <RotateCcw className="w-4 h-4 mr-2" />
                      Reset
                    </Button>
                  </div>

                  <div className="text-xs text-muted-foreground">
                    <CheckCircle className="w-4 h-4 inline mr-1" />
                    Studies show 25-minute focused sessions improve retention
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Study;