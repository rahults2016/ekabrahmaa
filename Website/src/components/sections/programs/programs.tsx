import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Clock, Users, ArrowRight, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { programs } from '@/config/programConst';



export default function ProgramsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-teal-50">
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl font-serif font-bold text-teal-900 mb-6">
            Healing Programs
          </h1>
          <p className="text-xl text-teal-700 leading-relaxed ">
            Choose from our carefully crafted programs designed to address your unique healing needs and constitution
          </p>
        </div>
      </section>

      <section className="py-1 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-16">
          {programs.map((program) => (
            <Card key={program.id} className="border-teal-100 shadow-xl bg-white/80 backdrop-blur-sm overflow-hidden">
              <div className="grid lg:grid-cols-2 gap-8">
                <div className="relative h-64 lg:h-auto">
                  <img
                    src={program.image}
                    alt={program.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-teal-900/20 to-transparent"></div>
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

                  <Tabs defaultValue="features" className="mb-6">
                    <TabsList className="grid w-full grid-cols-3 bg-amber-500">
                      <TabsTrigger value="features">Features</TabsTrigger>
                      <TabsTrigger value="timeline">Timeline</TabsTrigger>
                      <TabsTrigger value="healers">Healers</TabsTrigger>
                    </TabsList>

                    <TabsContent value="features" className="space-y-2">
                      {program.features.map((feature, index) => (
                        <div key={index} className="flex items-center space-x-2">
                          <CheckCircle className="w-4 h-4 text-teal-600" />
                          <span className="text-teal-700 text-sm">{feature}</span>
                        </div>
                      ))}
                    </TabsContent>

                    <TabsContent value="timeline" className="space-y-3">
                      {program.healingFlow.map((phase, index) => (
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
                      {program.healers_info.map((healer, index) => (
                        <div key={index} className="border-l-4 border-teal-200 pl-4">
                          <h4 className="font-semibold text-teal-800">{healer.name}</h4>
                          <p className="text-sm text-teal-600">{healer.specialization} • {healer.experience}</p>
                          <p className="text-sm text-teal-700 mt-1">{healer.description}</p>
                        </div>
                      ))}
                    </TabsContent>
                  </Tabs>

                  <Link
                    to={`/programs/${program.id}`}
                    key={program.id}
                    onClick={() => window.scrollTo(0, 0)}
                  >
                    <Button
                      size="lg"
                      className="w-full bg-gradient-to-r from-teal-600 to-teal-700 hover:from-teal-700 hover:to-teal-800 text-white"
                    >
                      Start {program.title}
                      <ArrowRight className="w-5 h-5 ml-2" />
                    </Button>
                  </Link>


                </div>
              </div>
            </Card>
          ))}
        </div>
      </section>

      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-teal-50 to-pink-50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-serif font-bold text-teal-900 mb-6">
            Not Sure Which Program is Right for You?
          </h2>
          <p className="text-xl text-teal-700 mb-8 leading-relaxed">
            Take our Prakriti quiz to discover your unique constitution and get personalized program recommendations
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-gradient-to-r from-pink-600 to-pink-700 hover:from-pink-700 hover:to-pink-800 text-white px-8 py-3 rounded-full">
              Take Prakriti Quiz
            </Button>
            <Button variant="outline" size="lg" className="border-teal-600 text-teal-700 hover:bg-teal-50 px-8 py-3 rounded-full">
              Talk to a Healer
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
