import { Activity, Brain, Droplets, Heart, Moon, Sun, User, Utensils } from "lucide-react";

export const categoryIcons = {
    Body: <User className="w-5 h-5" />,
    Mind: <Brain className="w-5 h-5" />,
    Habits: <Activity className="w-5 h-5" />,
    Digestion: <Utensils className="w-5 h-5" />,
    Emotions: <Heart className="w-5 h-5" />
  };
  
  export const doshaIcons = {
    vata: <Moon className="w-5 h-5 text-blue-500" />,
    pitta: <Sun className="w-5 h-5 text-red-500" />,
    kapha: <Droplets className="w-5 h-5 text-green-500" />
  };
  
  export const questions = [
    {
      id: 1,
      question: "How do you typically feel in cold weather?",
      category: "Body",
      options: [
        { text: "I love it and feel energized", dosha: "kapha" },
        { text: "I'm comfortable but prefer moderate temperatures", dosha: "pitta" },
        { text: "I feel cold easily and need warm clothing", dosha: "vata" }
      ]
    },
    {
      id: 2,
      question: "How would you describe your energy levels?",
      category: "Body",
      options: [
        { text: "Quick bursts of energy, then I need rest", dosha: "vata" },
        { text: "Steady and sustained throughout the day", dosha: "pitta" },
        { text: "Slow to start but can maintain energy for long periods", dosha: "kapha" }
      ]
    },
    {
      id: 3,
      question: "What is your typical body frame?",
      category: "Body",
      options: [
        { text: "Thin, light, find it hard to gain weight", dosha: "vata" },
        { text: "Medium build, well-proportioned", dosha: "pitta" },
        { text: "Larger frame, gain weight easily", dosha: "kapha" }
      ]
    },
    {
      id: 4,
      question: "How do you handle stress?",
      category: "Mind",
      options: [
        { text: "I get anxious and scattered", dosha: "vata" },
        { text: "I become irritable and focused", dosha: "pitta" },
        { text: "I withdraw and become lethargic", dosha: "kapha" }
      ]
    },
    {
      id: 5,
      question: "What describes your sleep pattern?",
      category: "Habits",
      options: [
        { text: "Light sleeper, mind races at night", dosha: "vata" },
        { text: "Moderate sleep, wake up refreshed", dosha: "pitta" },
        { text: "Deep sleeper, hard to wake up", dosha: "kapha" }
      ]
    },
    {
      id: 6,
      question: "How is your digestion?",
      category: "Digestion",
      options: [
        { text: "Irregular, sometimes bloated or gassy", dosha: "vata" },
        { text: "Strong, get hungry frequently", dosha: "pitta" },
        { text: "Slow, feel heavy after meals", dosha: "kapha" }
      ]
    },
    {
      id: 7,
      question: "What's your approach to decision-making?",
      category: "Mind",
      options: [
        { text: "Quick to decide but often change my mind", dosha: "vata" },
        { text: "Analytical, consider pros and cons", dosha: "pitta" },
        { text: "Take time to decide, stick with decisions", dosha: "kapha" }
      ]
    },
    {
      id: 8,
      question: "How do you prefer to exercise?",
      category: "Habits",
      options: [
        { text: "Varied activities, get bored easily", dosha: "vata" },
        { text: "Competitive sports, moderate intensity", dosha: "pitta" },
        { text: "Gentle, consistent activities like walking", dosha: "kapha" }
      ]
    },
    {
      id: 9,
      question: "What's your memory like?",
      category: "Mind",
      options: [
        { text: "Quick to learn, quick to forget", dosha: "vata" },
        { text: "Good memory, especially for important things", dosha: "pitta" },
        { text: "Slow to learn but excellent long-term memory", dosha: "kapha" }
      ]
    },
    {
      id: 10,
      question: "How do you react to change?",
      category: "Emotions",
      options: [
        { text: "I embrace change and new experiences", dosha: "vata" },
        { text: "I adapt well if the change makes sense", dosha: "pitta" },
        { text: "I prefer routine and stability", dosha: "kapha" }
      ]
    },
    {
      id: 11,
      question: "What's your skin like?",
      category: "Body",
      options: [
        { text: "Dry, rough, or thin", dosha: "vata" },
        { text: "Warm, oily, prone to rashes", dosha: "pitta" },
        { text: "Thick, oily, smooth", dosha: "kapha" }
      ]
    },
    {
      id: 12,
      question: "How do you express emotions?",
      category: "Emotions",
      options: [
        { text: "Quickly and intensely, then move on", dosha: "vata" },
        { text: "Passionately and directly", dosha: "pitta" },
        { text: "Slowly and steadily", dosha: "kapha" }
      ]
    },
    {
      id: 13,
      question: "What's your appetite like?",
      category: "Digestion",
      options: [
        { text: "Variable, sometimes forget to eat", dosha: "vata" },
        { text: "Strong, get irritable when hungry", dosha: "pitta" },
        { text: "Steady, can skip meals easily", dosha: "kapha" }
      ]
    },
    {
      id: 14,
      question: "How do you learn best?",
      category: "Mind",
      options: [
        { text: "Through discussion and variety", dosha: "vata" },
        { text: "Through focused study and practice", dosha: "pitta" },
        { text: "Through repetition and hands-on experience", dosha: "kapha" }
      ]
    },
    {
      id: 15,
      question: "What's your hair like?",
      category: "Body",
      options: [
        { text: "Dry, brittle, or frizzy", dosha: "vata" },
        { text: "Fine, oily, early graying", dosha: "pitta" },
        { text: "Thick, lustrous, strong", dosha: "kapha" }
      ]
    },
    {
      id: 16,
      question: "How do you handle routine?",
      category: "Habits",
      options: [
        { text: "I prefer variety and spontaneity", dosha: "vata" },
        { text: "I like structured routines that work", dosha: "pitta" },
        { text: "I thrive on consistent, stable routines", dosha: "kapha" }
      ]
    },
    {
      id: 17,
      question: "What motivates you most?",
      category: "Emotions",
      options: [
        { text: "New experiences and creativity", dosha: "vata" },
        { text: "Achievement and recognition", dosha: "pitta" },
        { text: "Security and helping others", dosha: "kapha" }
      ]
    },
    {
      id: 18,
      question: "How do you speak?",
      category: "Mind",
      options: [
        { text: "Fast, enthusiastic, lots of ideas", dosha: "vata" },
        { text: "Clear, precise, persuasive", dosha: "pitta" },
        { text: "Slow, thoughtful, gentle", dosha: "kapha" }
      ]
    },
    {
      id: 19,
      question: "What's your relationship with money?",
      category: "Habits",
      options: [
        { text: "Spend impulsively, don't save much", dosha: "vata" },
        { text: "Spend on quality, plan purchases", dosha: "pitta" },
        { text: "Save regularly, spend carefully", dosha: "kapha" }
      ]
    },
    {
      id: 20,
      question: "How do you prefer your environment?",
      category: "Emotions",
      options: [
        { text: "Warm, cozy, and stimulating", dosha: "vata" },
        { text: "Cool, organized, and efficient", dosha: "pitta" },
        { text: "Comfortable, stable, and harmonious", dosha: "kapha" }
      ]
    }
  ];
  

  export const getDoshaInfo = (dosha: string) => {
    const info = {
      vata: {
        name: 'Vata',
        element: 'Air & Space',
        qualities: 'Movement, Creativity, Flexibility',
        description: 'You are naturally creative, energetic, and love variety. You may be prone to anxiety when out of balance.',
        recommendations: ['Regular routine', 'Warm, cooked foods', 'Gentle exercise', 'Adequate rest'],
        color: 'from-blue-500 to-purple-500',
        icon: <Moon className="w-6 h-6" />
      },
      pitta: {
        name: 'Pitta',
        element: 'Fire & Water',
        qualities: 'Transformation, Intelligence, Leadership',
        description: 'You are naturally focused, ambitious, and have strong digestion. You may be prone to irritability when out of balance.',
        recommendations: ['Cooling foods', 'Moderate exercise', 'Stress management', 'Avoid overheating'],
        color: 'from-red-500 to-orange-500',
        icon: <Sun className="w-6 h-6" />
      },
      kapha: {
        name: 'Kapha',
        element: 'Earth & Water',
        qualities: 'Stability, Strength, Compassion',
        description: 'You are naturally calm, stable, and have strong immunity. You may be prone to lethargy when out of balance.',
        recommendations: ['Stimulating activities', 'Light, warm foods', 'Regular exercise', 'Variety in routine'],
        color: 'from-green-500 to-teal-500',
        icon: <Droplets className="w-6 h-6" />
      }
    };
    return info[dosha as keyof typeof info];
  };