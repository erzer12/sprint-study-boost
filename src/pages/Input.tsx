import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input as InputField } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { Plus, BookOpen } from 'lucide-react';

const InputPage = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    title: '',
    subject: '',
    topic: '',
    link: '',
    description: '',
    rating: '',
    questionType: ''
  });

  const subjects = [
    'Mathematics', 'Physics', 'Chemistry', 'Biology', 'English', 
    'History', 'Geography', 'Computer Science', 'Economics', 'Psychology'
  ];

  const questionTypes = [
    'Multiple Choice', 'Short Answer', 'Essay', 'True/False', 
    'Fill in the Blank', 'Diagram', 'Calculation', 'Analysis'
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.title || !formData.subject || !formData.topic) {
      toast({
        title: "Missing Information",
        description: "Please fill in at least Title, Subject, and Topic.",
        variant: "destructive"
      });
      return;
    }

    // Simulate saving to database
    console.log('Saving resource:', formData);
    
    toast({
      title: "Resource Added Successfully!",
      description: `${formData.title} has been added to your study resources.`,
    });

    // Reset form
    setFormData({
      title: '',
      subject: '',
      topic: '',
      link: '',
      description: '',
      rating: '',
      questionType: ''
    });
  };

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Plus className="w-8 h-8 text-primary" />
            <h1 className="text-3xl font-bold text-foreground">Add Study Resource</h1>
          </div>
          <p className="text-muted-foreground">
            Build your personalized study library by adding exam topics, resources, and materials
          </p>
        </div>

        {/* Form */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-primary" />
              Resource Details
            </CardTitle>
            <CardDescription>
              Fill in the information below to add a new study resource to your collection
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Title */}
              <div className="space-y-2">
                <Label htmlFor="title">Title *</Label>
                <InputField
                  id="title"
                  placeholder="e.g., Quadratic Equations Practice"
                  value={formData.title}
                  onChange={(e) => handleInputChange('title', e.target.value)}
                  className="w-full"
                />
              </div>

              {/* Subject and Topic Row */}
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="subject">Subject *</Label>
                  <Select value={formData.subject} onValueChange={(value) => handleInputChange('subject', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select subject" />
                    </SelectTrigger>
                    <SelectContent>
                      {subjects.map((subject) => (
                        <SelectItem key={subject} value={subject}>
                          {subject}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="topic">Topic *</Label>
                  <InputField
                    id="topic"
                    placeholder="e.g., Algebra, Chemical Bonds"
                    value={formData.topic}
                    onChange={(e) => handleInputChange('topic', e.target.value)}
                  />
                </div>
              </div>

              {/* Link */}
              <div className="space-y-2">
                <Label htmlFor="link">Resource Link</Label>
                <InputField
                  id="link"
                  type="url"
                  placeholder="https://example.com/study-material"
                  value={formData.link}
                  onChange={(e) => handleInputChange('link', e.target.value)}
                />
              </div>

              {/* Description */}
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Brief description of the resource and what it covers..."
                  rows={4}
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                />
              </div>

              {/* Rating and Question Type Row */}
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="rating">Rating (1-5)</Label>
                  <Select value={formData.rating} onValueChange={(value) => handleInputChange('rating', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Rate resource" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="5">⭐⭐⭐⭐⭐ Excellent</SelectItem>
                      <SelectItem value="4">⭐⭐⭐⭐ Good</SelectItem>
                      <SelectItem value="3">⭐⭐⭐ Average</SelectItem>
                      <SelectItem value="2">⭐⭐ Below Average</SelectItem>
                      <SelectItem value="1">⭐ Poor</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="questionType">Question Type</Label>
                  <Select value={formData.questionType} onValueChange={(value) => handleInputChange('questionType', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select question type" />
                    </SelectTrigger>
                    <SelectContent>
                      {questionTypes.map((type) => (
                        <SelectItem key={type} value={type}>
                          {type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Submit Button */}
              <div className="flex gap-4 pt-4">
                <Button type="submit" className="flex-1" size="lg">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Resource
                </Button>
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => setFormData({
                    title: '', subject: '', topic: '', link: '', 
                    description: '', rating: '', questionType: ''
                  })}
                >
                  Clear Form
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default InputPage;