import { Droplets, Moon, Sparkles, Sun } from "lucide-react";

export const programs = [
    {
      id: 'ekapavana',
      title: 'ekaPavana',
      subtitle: 'Clear Within',
      description: 'A comprehensive 7-day cleansing program that reconnects you with your body, breath, and being through gentle detoxification and mindful practices.',
      duration: '7 Days',
      price: '₹3,999',
      healers: 2,
      type: 'Self-Guided',
      icon: <Droplets className="w-8 h-8" />,
      image: 'https://images.pexels.com/photos/1029896/pexels-photo-1029896.jpeg?auto=compress&cs=tinysrgb&w=800',
      features: [
        'Daily virtual consultations with Ayurveda doctor',
        'Personalized cleansing meal plan',
        'Guided yoga and pranayama sessions',
        'Herbal tea blends for detoxification',
        'Meditation and mindfulness practices',
        'Progress tracking journal'
      ],
      healingFlow: [
        { day: 1, title: 'Preparation', activities: ['Initial consultation', 'Diet transition', 'Herbal tea introduction'] },
        { day: 2, title: 'Gentle Cleansing', activities: ['Morning yoga', 'Cleansing diet', 'Evening meditation'] },
        { day: 3, title: 'Deep Detox', activities: ['Pranayama practice', 'Oil pulling', 'Herbal steam'] },
        { day: 4, title: 'Renewal', activities: ['Body massage', 'Mindful eating', 'Journaling'] },
        { day: 5, title: 'Integration', activities: ['Energy assessment', 'Lifestyle planning', 'Gratitude practice'] },
        { day: 6, title: 'Stabilization', activities: ['Dosha balancing', 'Routine establishment', 'Community sharing'] },
        { day: 7, title: 'Completion', activities: ['Final consultation', 'Future planning', 'Celebration ritual'] }
      ],
      healers_info: [
        {
          name: 'Dr. Priya Sharma',
          specialization: 'Ayurveda Physician',
          experience: '12 years',
          description: 'Specialist in Panchakarma and detoxification therapies'
        },
        {
          name: 'Ravi Kumar',
          specialization: 'Yoga Therapist',
          experience: '8 years',
          description: 'Expert in pranayama and meditation techniques'
        }
      ],
      doshaFocus: {
        vata: 'High',
        pitta: 'Medium',
        kapha: 'Low'
      },
      doshaSpecificBenefits: {
        vata: 'Calms anxiety, reduces dryness, improves sleep quality',
        pitta: 'Cools excess heat, reduces inflammation, balances intensity',
        kapha: 'Stimulates metabolism, reduces congestion, increases energy'
      }
    },
    {
      id: 'ekasanskara',
      title: 'ekaSanskara',
      subtitle: 'Rewrite Your Rhythm',
      description: 'A profound 14-day transformation program that addresses deep-rooted patterns and creates lasting change through intensive Ayurvedic practices.',
      duration: '14 Days',
      price: '₹7,999',
      healers: 4,
      type: 'Healer-Guided',
      icon: <Sun className="w-8 h-8" />,
      image: 'https://images.pexels.com/photos/1051838/pexels-photo-1051838.jpeg?auto=compress&cs=tinysrgb&w=800',
      features: [
        'Intensive daily consultations',
        'Custom herbal formulations',
        'Personalized yoga therapy',
        'Emotional release practices',
        'Lifestyle and dietary counseling',
        'Ongoing support and follow-up'
      ],
      healingFlow: [
        { day: 1, title: 'Deep Assessment', activities: ['Comprehensive consultation', 'Dosha analysis', 'Goal setting'] },
        { day: 3, title: 'Foundation Building', activities: ['Routine establishment', 'Herbal medicine start', 'Yoga practice'] },
        { day: 5, title: 'Intensive Therapy', activities: ['Emotional work', 'Body therapies', 'Meditation deepening'] },
        { day: 7, title: 'Mid-point Review', activities: ['Progress assessment', 'Plan adjustment', 'Community connection'] },
        { day: 10, title: 'Integration Phase', activities: ['Lifestyle integration', 'Habit formation', 'Relationship healing'] },
        { day: 12, title: 'Stabilization', activities: ['Energy balancing', 'Future visioning', 'Support planning'] },
        { day: 14, title: 'Graduation', activities: ['Final assessment', 'Maintenance plan', 'Celebration'] }
      ],
      healers_info: [
        {
          name: 'Dr. Anjali Patel',
          specialization: 'Senior Ayurveda Physician',
          experience: '15 years',
          description: 'Expert in constitutional therapy and emotional healing'
        },
        {
          name: 'Meditation Master Suresh',
          specialization: 'Mindfulness Guide',
          experience: '20 years',
          description: 'Specialist in deep transformational practices'
        },
        {
          name: 'Nutritionist Kavya',
          specialization: 'Ayurvedic Nutrition',
          experience: '10 years',
          description: 'Expert in therapeutic diet planning'
        },
        {
          name: 'Dr. Rajesh Kumar',
          specialization: 'Functional Trainer',
          experience: '12 years',
          description: 'Expert in movement therapy and physical rehabilitation'
        }
      ],
      doshaFocus: {
        vata: 'Medium',
        pitta: 'High',
        kapha: 'Medium'
      },
      doshaSpecificBenefits: {
        vata: 'Establishes grounding routines, reduces overwhelm, creates stability',
        pitta: 'Transforms anger into purpose, balances ambition, enhances leadership',
        kapha: 'Breaks through stagnation, releases emotional attachments, inspires change'
      }
    },
    {
      id: 'ekasamanvaya',
      title: 'ekaSamanvaya',
      subtitle: 'In Tune with You',
      description: 'A comprehensive 21-day program that brings all aspects of your being into harmony through integrated healing practices.',
      duration: '21 Days',
      price: '₹7,999',
      healers: 5,
      type: 'Comprehensive',
      icon: <Moon className="w-8 h-8" />,
      image: 'https://images.pexels.com/photos/3822622/pexels-photo-3822622.jpeg?auto=compress&cs=tinysrgb&w=800',
      features: [
        'Complete 5-healer team integration',
        'Personalized Ayurvedic protocols',
        'Comprehensive nutrition planning',
        'Yoga and movement therapy',
        'Psychological support and counseling',
        'Daily routine optimization'
      ],
      healingFlow: [
        { day: 1, title: 'Comprehensive Assessment', activities: ['Full team consultation', 'Dosha analysis', 'Goal alignment'] },
        { day: 5, title: 'Foundation Phase', activities: ['Routine establishment', 'Diet implementation', 'Movement introduction'] },
        { day: 10, title: 'Integration Phase', activities: ['Emotional work', 'Habit formation', 'Energy balancing'] },
        { day: 15, title: 'Harmony Phase', activities: ['Advanced practices', 'Lifestyle optimization', 'Relationship healing'] },
        { day: 21, title: 'Mastery Phase', activities: ['Self-sufficiency', 'Long-term planning', 'Celebration'] }
      ],
      healers_info: [
        {
          name: 'Dr. Priya Sharma',
          specialization: 'Lead Ayurveda Physician',
          experience: '14 years',
          description: 'Expert in constitutional therapy and Panchakarma'
        },
        {
          name: 'Nutritionist Kavya',
          specialization: 'Ayurvedic Nutrition',
          experience: '9 years',
          description: 'Specialist in therapeutic diet and anti-inflammatory nutrition'
        },
        {
          name: 'Yoga Master Arjun',
          specialization: 'Yoga & Breathwork',
          experience: '12 years',
          description: 'Expert in pranayama and movement therapy'
        },
        {
          name: 'Dr. Meera Patel',
          specialization: 'Psychologist',
          experience: '10 years',
          description: 'Specialist in mind-body healing and emotional wellness'
        },
        {
          name: 'Trainer Vikram',
          specialization: 'Functional Movement',
          experience: '8 years',
          description: 'Expert in strength training and physical rehabilitation'
        }
      ],
      doshaFocus: {
        vata: 'Medium',
        pitta: 'Medium',
        kapha: 'High'
      },
      doshaSpecificBenefits: {
        vata: 'Creates comprehensive stability and routine for lasting balance',
        pitta: 'Channels intensity into purposeful transformation and leadership',
        kapha: 'Breaks through inertia and establishes dynamic, harmonious living'
      }
    },
    {
      id: 'ekaudaya',
      title: 'ekaUdaya',
      subtitle: 'Rise into Radiance',
      description: 'A transformative 28-day program designed to elevate your entire being into radiant health and vitality.',
      duration: '28 Days',
      price: '₹11,999',
      healers: 5,
      type: 'Transformative',
      icon: <Sun className="w-8 h-8" />,
      image: 'https://images.pexels.com/photos/1051838/pexels-photo-1051838.jpeg?auto=compress&cs=tinysrgb&w=800',
      features: [
        'Intensive 5-healer collaboration',
        'Advanced Panchakarma protocols',
        'Personalized herbal formulations',
        'Advanced yoga and meditation',
        'Comprehensive lifestyle transformation',
        '3-month follow-up support'
      ],
      healingFlow: [
        { day: 1, title: 'Deep Preparation', activities: ['Comprehensive assessment', 'Detox preparation', 'Team alignment'] },
        { day: 7, title: 'Purification Phase', activities: ['Panchakarma protocols', 'Deep cleansing', 'Energy work'] },
        { day: 14, title: 'Transformation Phase', activities: ['Intensive practices', 'Pattern breaking', 'New habit formation'] },
        { day: 21, title: 'Integration Phase', activities: ['Lifestyle mastery', 'Relationship healing', 'Purpose alignment'] },
        { day: 28, title: 'Radiance Phase', activities: ['Vitality optimization', 'Wisdom integration', 'Future visioning'] }
      ],
      healers_info: [
        {
          name: 'Dr. Anjali Patel',
          specialization: 'Senior Ayurveda Physician',
          experience: '15 years',
          description: 'Master of advanced Panchakarma and constitutional therapy'
        },
        {
          name: 'Nutritionist Kavya',
          specialization: 'Therapeutic Nutrition',
          experience: '10 years',
          description: 'Expert in healing foods and metabolic optimization'
        },
        {
          name: 'Yoga Master Suresh',
          specialization: 'Advanced Yoga Therapy',
          experience: '20 years',
          description: 'Master of pranayama, meditation, and energy work'
        },
        {
          name: 'Dr. Meera Patel',
          specialization: 'Transformational Psychology',
          experience: '12 years',
          description: 'Expert in deep healing and consciousness transformation'
        },
        {
          name: 'Master Trainer Vikram',
          specialization: 'Holistic Fitness',
          experience: '10 years',
          description: 'Expert in strength, flexibility, and vitality optimization'
        }
      ],
      doshaFocus: {
        vata: 'High',
        pitta: 'High',
        kapha: 'Medium'
      },
      doshaSpecificBenefits: {
        vata: 'Establishes deep stability while maintaining creative flow and vitality',
        pitta: 'Transforms intensity into radiant leadership and purposeful action',
        kapha: 'Ignites inner fire and motivation while maintaining groundedness'
      }
    },
    {
      id: 'ekaprabodha',
      title: 'ekaPrabodha',
      subtitle: 'Awaken the Wisdom Within',
      description: 'The ultimate 45-day journey of awakening, integrating ancient wisdom with modern healing for complete transformation.',
      duration: '45 Days',
      price: '₹17,999',
      healers: 5,
      type: 'Mastery',
      icon: <Sparkles className="w-8 h-8" />,
      image: 'https://images.pexels.com/photos/3822622/pexels-photo-3822622.jpeg?auto=compress&cs=tinysrgb&w=800',
      features: [
        'Master-level 5-healer guidance',
        'Advanced spiritual practices',
        'Personalized wisdom teachings',
        'Complete lifestyle mastery',
        'Leadership development',
        '1-year ongoing mentorship'
      ],
      healingFlow: [
        { day: 1, title: 'Sacred Preparation', activities: ['Spiritual assessment', 'Intention setting', 'Sacred commitment'] },
        { day: 10, title: 'Purification Mastery', activities: ['Advanced cleansing', 'Energy purification', 'Mental clarity'] },
        { day: 20, title: 'Wisdom Awakening', activities: ['Ancient teachings', 'Intuition development', 'Inner guidance'] },
        { day: 30, title: 'Integration Mastery', activities: ['Lifestyle mastery', 'Relationship transformation', 'Service preparation'] },
        { day: 45, title: 'Wisdom Embodiment', activities: ['Teaching preparation', 'Leadership development', 'Sacred graduation'] }
      ],
      healers_info: [
        {
          name: 'Guru Dr. Rajesh',
          specialization: 'Master Ayurveda Physician',
          experience: '25 years',
          description: 'Master teacher of classical Ayurveda and spiritual healing'
        },
        {
          name: 'Master Nutritionist Priya',
          specialization: 'Consciousness Nutrition',
          experience: '15 years',
          description: 'Expert in food as medicine and consciousness elevation'
        },
        {
          name: 'Yoga Guru Ananda',
          specialization: 'Classical Yoga Master',
          experience: '30 years',
          description: 'Master of classical yoga, meditation, and spiritual practices'
        },
        {
          name: 'Dr. Wisdom Keeper Maya',
          specialization: 'Consciousness Psychology',
          experience: '18 years',
          description: 'Expert in consciousness transformation and wisdom integration'
        },
        {
          name: 'Master Trainer Arjun',
          specialization: 'Sacred Movement',
          experience: '15 years',
          description: 'Master of movement as spiritual practice and energy cultivation'
        }
      ],
      doshaFocus: {
        vata: 'High',
        pitta: 'High',
        kapha: 'High'
      },
      doshaSpecificBenefits: {
        vata: 'Awakens intuitive wisdom while establishing profound inner stability',
        pitta: 'Transforms ambition into spiritual leadership and conscious service',
        kapha: 'Ignites spiritual fire while maintaining compassionate groundedness'
      }
    }
  ];