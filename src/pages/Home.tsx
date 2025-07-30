import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BookOpen, Clock, Target, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';

const Home = () => {
  const features = [
    {
      icon: BookOpen,
      title: 'Study Resources',
      description: 'Access curated exam materials organized by subject and topic',
      color: 'text-primary'
    },
    {
      icon: Clock,
      title: 'Study Timer',
      description: 'Boost productivity with focused study sessions and breaks',
      color: 'text-success'
    },
    {
      icon: Target,
      title: 'Flashcards',
      description: 'Master concepts with interactive flashcards and spaced repetition',
      color: 'text-primary'
    },
    {
      icon: TrendingUp,
      title: 'Track Progress',
      description: 'Monitor your study progress and identify areas for improvement',
      color: 'text-success'
    }
  ];

  const quickActions = [
    { title: 'Start Studying', description: 'Jump into your study session', path: '/study', variant: 'default' as const },
    { title: 'Add Resources', description: 'Input new study materials', path: '/input', variant: 'outline' as const }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary/10 via-background to-success/5 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            {/* Mobile: Stacked Layout */}
            <div className="block md:hidden">
              <h1 className="text-4xl sm:text-5xl font-bold text-success mb-4">
                Study Sprint
              </h1>
              <p className="text-xl sm:text-2xl text-foreground mb-8">
                Ace Your Exams!
              </p>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
                Your ultimate companion for high school exam preparation. Organize resources, 
                create flashcards, and track your progress with our comprehensive study platform.
              </p>
            </div>

            {/* Tablet/Desktop: Grid Layout */}
            <div className="hidden md:block">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div className="text-left">
                  <h1 className="text-5xl lg:text-6xl font-bold text-success mb-4">
                    Study Sprint
                  </h1>
                  <p className="text-2xl lg:text-3xl text-foreground mb-6">
                    Ace Your Exams!
                  </p>
                  <p className="text-lg text-muted-foreground mb-8">
                    Your ultimate companion for high school exam preparation. Organize resources, 
                    create flashcards, and track your progress with our comprehensive study platform.
                  </p>
                </div>
                <div className="flex justify-center">
                  <div className="w-64 h-64 bg-gradient-to-br from-primary to-success rounded-full flex items-center justify-center">
                    <BookOpen className="w-32 h-32 text-white" />
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
              {quickActions.map((action) => (
                <Button key={action.title} asChild variant={action.variant} size="lg" className="text-lg">
                  <Link to={action.path}>
                    <div className="text-center">
                      <div className="font-semibold">{action.title}</div>
                      <div className="text-sm opacity-90">{action.description}</div>
                    </div>
                  </Link>
                </Button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            Everything You Need to Excel
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature) => (
              <Card key={feature.title} className="text-center hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="mx-auto mb-4">
                    <feature.icon className={`w-12 h-12 ${feature.color}`} />
                  </div>
                  <CardTitle className="text-lg">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-sm">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-muted/30 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-primary">500+</div>
              <div className="text-sm text-muted-foreground">Study Resources</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-success">98%</div>
              <div className="text-sm text-muted-foreground">Success Rate</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary">10k+</div>
              <div className="text-sm text-muted-foreground">Students</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-success">24/7</div>
              <div className="text-sm text-muted-foreground">Access</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;