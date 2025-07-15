import { useState, useEffect } from 'react';
import { Button } from '@/components/website/ui/button';
import { Card, CardContent } from '@/components/website/ui/card';
import { Badge } from '@/components/website/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/website/ui/tabs';
import { Clock, Users, ArrowRight, CheckCircle, Leaf } from 'lucide-react';
import { Link } from 'react-router-dom';
import { programs } from '@/data/website/programConst';



interface ProgramDetailClientProps {
  programId: string;
}

export default function ProgramDetailClient({ programId }: ProgramDetailClientProps) {
  const [program, setProgram] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [userDosha, setUserDosha] = useState<any>(null);

  useEffect(() => {
    const foundProgram = programs.find(p => p.id === programId);

    if (foundProgram) {
      setProgram(foundProgram);
    }

    try {
      const doshaData = localStorage.getItem('userDosha');
      if (doshaData) {
        setUserDosha(JSON.parse(doshaData));
      }
    } catch (error) {
      console.error("Error retrieving dosha data:", error);
    }

    setLoading(false);
  }, [programId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-teal-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-teal-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-teal-700">Loading program details...</p>
        </div>
      </div>
    );
  }

  if (!program) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-teal-50 flex items-center justify-center">
        <div className="text-center max-w-md px-4">
          <div className="w-20 h-20 bg-gradient-to-r from-teal-100 to-pink-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Leaf className="w-10 h-10 text-teal-600" />
          </div>
          <h1 className="text-3xl font-serif font-bold text-teal-900 mb-4">Program Not Found</h1>
          <p className="text-teal-700 mb-8">We couldn't find the program you're looking for. Please check the URL or explore our available programs.</p>
          <Link to="/programs">
            <Button className="bg-gradient-to-r from-teal-600 to-teal-700 hover:from-teal-700 hover:to-teal-800 text-white px-6 py-3 rounded-full">
              View All Programs
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const getDoshaRecommendation = () => {
    if (!userDosha) return null;

    const dominantDosha = Object.keys(userDosha).reduce((a, b) =>
      userDosha[a] > userDosha[b] ? a : b
    );

    const isHighlyRecommended = program.doshaFocus[dominantDosha] === 'High';
    const isRecommended = program.doshaFocus[dominantDosha] === 'Medium';

    if (isHighlyRecommended) {
      return {
        label: 'Highly Recommended for Your Dosha',
        class: 'bg-gradient-to-r from-teal-500 to-teal-600 text-white'
      };
    } else if (isRecommended) {
      return {
        label: 'Recommended for Your Dosha',
        class: 'bg-gradient-to-r from-teal-400 to-teal-500 text-white'
      };
    }

    return null;
  };

  const doshaRecommendation = getDoshaRecommendation();

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <Card className="border-teal-100 shadow-xl bg-white/80 backdrop-blur-sm overflow-hidden">
          <div className="grid lg:grid-cols-2 gap-8">
            <div className="relative h-64 lg:h-auto overflow-hidden">
              <img
                src={program.image}
                alt={program.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-teal-900/20 to-transparent"></div>

              {doshaRecommendation && (
                <div className="absolute top-4 right-4">
                  <Badge className={`${doshaRecommendation.class} px-3 py-1 text-sm font-medium`}>
                    {doshaRecommendation.label}
                  </Badge>
                </div>
              )}
            </div>

            <div className="p-8">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gradient-to-r from-teal-100 to-pink-100 rounded-full flex items-center justify-center">
                    {program.icon}
                  </div>
                  <Badge variant="secondary" className="bg-gradient-to-r from-teal-50 to-pink-50 text-teal-700 border-teal-200">
                    {program.type}
                  </Badge>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold text-teal-900">{program.price}</div>
                  <div className="text-sm text-teal-600">{program.duration}</div>
                </div>
              </div>

              <h2 className="text-3xl font-serif font-bold text-teal-900 mb-2">
                {program.title}
              </h2>
              <h3 className="text-xl font-medium text-pink-600 mb-4">
                {program.subtitle}
              </h3>
              <p className="text-teal-700 leading-relaxed mb-6">
                {program.description}
              </p>

              <div className="flex items-center space-x-6 mb-6 text-sm text-teal-600">
                <div className="flex items-center space-x-1">
                  <Clock className="w-4 h-4" />
                  <span>{program.duration}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Users className="w-4 h-4" />
                  <span>{program.healers} Expert Healers</span>
                </div>
              </div>

              {userDosha && (
                <div className="mb-6 p-4 bg-gradient-to-r from-teal-50 to-pink-50 rounded-lg">
                  <h4 className="font-medium text-teal-800 mb-2">Benefits for Your Dosha</h4>
                  <p className="text-teal-700 text-sm">
                    {Object.keys(userDosha).reduce((a, b) => userDosha[a] > userDosha[b] ? a : b) === 'vata'
                      ? program.doshaSpecificBenefits.vata
                      : Object.keys(userDosha).reduce((a, b) => userDosha[a] > userDosha[b] ? a : b) === 'pitta'
                        ? program.doshaSpecificBenefits.pitta
                        : program.doshaSpecificBenefits.kapha}
                  </p>
                </div>
              )}

              <Tabs defaultValue="features" className="mb-6">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="features">Features</TabsTrigger>
                  <TabsTrigger value="timeline">Timeline</TabsTrigger>
                  <TabsTrigger value="healers">Healers</TabsTrigger>
                </TabsList>

                <TabsContent value="features" className="space-y-2">
                  {program.features.map((feature :any, index :any) => (
                    <div key={index} className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-teal-600" />
                      <span className="text-teal-700 text-sm">{feature}</span>
                    </div>
                  ))}
                </TabsContent>

                <TabsContent value="timeline" className="space-y-3">
                  {program.healingFlow.map((phase : any, index : any) => (
                    <div key={index} className="flex items-start space-x-3">
                      <div className="w-8 h-8 bg-teal-100 rounded-full flex items-center justify-center text-teal-700 font-semibold text-sm">
                        {phase.day}
                      </div>
                      <div>
                        <h4 className="font-medium text-teal-800">{phase.title}</h4>
                        <p className="text-sm text-teal-600">{phase.activities.join(', ')}</p>
                      </div>
                    </div>
                  ))}
                </TabsContent>

                <TabsContent value="healers" className="space-y-4">
                  {program.healers_info.map((healer : any, index : any) => (
                    <div key={index} className="border-l-4 border-teal-200 pl-4">
                      <h4 className="font-semibold text-teal-800">{healer.name}</h4>
                      <p className="text-sm text-teal-600">{healer.specialization} • {healer.experience}</p>
                      <p className="text-sm text-teal-700 mt-1">{healer.description}</p>
                    </div>
                  ))}
                </TabsContent>
              </Tabs>

              <Button
                size="lg"
                className="w-full bg-gradient-to-r from-teal-600 to-teal-700 hover:from-teal-700 hover:to-teal-800 text-white"
              >
                Start {program.title}
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </div>
          </div>
        </Card>

        <div className="mt-16">
          <h3 className="text-2xl font-serif font-bold text-teal-900 mb-8 text-center">
            Other Programs You Might Like
          </h3>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {programs
              .filter(p => p.id !== program.id)
              .slice(0, 3)
              .map(relatedProgram => (
                <Link to={`/programs/${relatedProgram.id}`} key={relatedProgram.id}>
                  <Card className="border-teal-100 shadow-lg hover:shadow-xl transition-all duration-300 bg-white/80 backdrop-blur-sm h-full group transform hover:scale-105">
                    <div className="relative h-48 overflow-hidden rounded-t-lg">
                      <img
                        src={relatedProgram.image}
                        alt={relatedProgram.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                      <div className="absolute bottom-4 left-4 right-4">
                        <h4 className="text-xl font-serif font-bold text-white">{relatedProgram.title}</h4>
                        <p className="text-white/90 text-sm">{relatedProgram.subtitle}</p>
                      </div>
                    </div>
                    <CardContent className="p-4">
                      <div className="flex justify-between items-center mb-2">
                        <Badge variant="outline" className="text-xs border-teal-200 text-teal-700">
                          {relatedProgram.type}
                        </Badge>
                        <span className="text-sm text-teal-600">{relatedProgram.duration}</span>
                      </div>
                      <p className="text-teal-700 text-sm line-clamp-2 mb-4">
                        {relatedProgram.description}
                      </p>
                      <div className="flex justify-between items-center">
                        <span className="text-xl font-bold text-teal-900">{relatedProgram.price}</span>
                        <Badge variant="secondary" className="bg-teal-100 text-teal-700">
                          {relatedProgram.healers} Healers
                        </Badge>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}