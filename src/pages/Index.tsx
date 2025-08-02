import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

const Index = () => {
  const [prompt, setPrompt] = useState('');
  const [selectedFormat, setSelectedFormat] = useState('image');
  const [history, setHistory] = useState([
    { id: 1, type: 'image', title: 'Космический пейзаж', date: '2 часа назад', url: 'https://v3.fal.media/files/elephant/epMu7IdiZmEVhEJZJAg63_output.png' },
    { id: 2, type: 'video', title: 'Анимация облаков', date: '5 часов назад', url: '#' },
    { id: 3, type: 'image', title: 'Портрет в стиле ретро', date: '1 день назад', url: '#' }
  ]);

  const generateContent = () => {
    if (!prompt.trim()) return;
    
    const newItem = {
      id: Date.now(),
      type: selectedFormat,
      title: prompt.slice(0, 30) + (prompt.length > 30 ? '...' : ''),
      date: 'Только что',
      url: selectedFormat === 'image' ? 'https://v3.fal.media/files/elephant/epMu7IdiZmEVhEJZJAg63_output.png' : '#'
    };
    
    setHistory([newItem, ...history]);
    setPrompt('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-white">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <nav className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-indigo rounded-lg flex items-center justify-center">
                <Icon name="Sparkles" size={18} className="text-white" />
              </div>
              <h1 className="text-xl font-bold text-darkgray">AI Generator</h1>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <a href="#home" className="text-darkgray hover:text-indigo transition-colors">Главная</a>
              <a href="#generator" className="text-darkgray hover:text-indigo transition-colors">Генератор</a>
              <a href="#gallery" className="text-darkgray hover:text-indigo transition-colors">Галерея</a>
              <a href="#pricing" className="text-darkgray hover:text-indigo transition-colors">Тарифы</a>
            </div>
            <Button className="bg-indigo hover:bg-indigo/90">
              Войти
            </Button>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section id="home" className="py-20">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-5xl font-bold text-darkgray mb-6">
              Создавайте <span className="text-indigo">фото и видео</span> с помощью ИИ
            </h2>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Превратите ваши идеи в потрясающие визуальные произведения всего за несколько секунд
            </p>
            <div className="flex justify-center space-x-4">
              <Button size="lg" className="bg-indigo hover:bg-indigo/90 text-white px-8 py-3 rounded-2xl">
                <Icon name="Sparkles" size={20} className="mr-2" />
                Попробовать бесплатно
              </Button>
              <Button variant="outline" size="lg" className="border-indigo text-indigo hover:bg-indigo/5 px-8 py-3 rounded-2xl">
                <Icon name="Play" size={20} className="mr-2" />
                Смотреть демо
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Generator Section */}
      <section id="generator" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h3 className="text-3xl font-bold text-center text-darkgray mb-12">Генератор контента</h3>
            
            <Card className="border-0 shadow-xl rounded-3xl overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-indigo to-emerald text-white p-8">
                <CardTitle className="text-2xl">Создайте что-то удивительное</CardTitle>
                <CardDescription className="text-white/90">
                  Опишите ваше видение, и мы воплотим его в жизнь
                </CardDescription>
              </CardHeader>
              <CardContent className="p-8">
                <div className="space-y-6">
                  <Tabs value={selectedFormat} onValueChange={setSelectedFormat} className="w-full">
                    <TabsList className="grid w-full grid-cols-2 rounded-2xl bg-light p-1">
                      <TabsTrigger value="image" className="rounded-xl data-[state=active]:bg-indigo data-[state=active]:text-white">
                        <Icon name="Image" size={18} className="mr-2" />
                        Изображение
                      </TabsTrigger>
                      <TabsTrigger value="video" className="rounded-xl data-[state=active]:bg-indigo data-[state=active]:text-white">
                        <Icon name="Video" size={18} className="mr-2" />
                        Видео
                      </TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="image" className="mt-6 space-y-4">
                      <Textarea
                        placeholder="Опишите изображение, которое хотите создать..."
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                        className="min-h-32 resize-none rounded-2xl border-gray-200 focus:border-indigo"
                      />
                      <div className="flex flex-wrap gap-2">
                        {['Фотореализм', 'Аниме', 'Цифровое искусство', 'Акварель'].map((style) => (
                          <Badge key={style} variant="outline" className="cursor-pointer hover:bg-indigo hover:text-white hover:border-indigo rounded-xl">
                            {style}
                          </Badge>
                        ))}
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="video" className="mt-6 space-y-4">
                      <Textarea
                        placeholder="Опишите видео, которое хотите создать..."
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                        className="min-h-32 resize-none rounded-2xl border-gray-200 focus:border-indigo"
                      />
                      <div className="flex flex-wrap gap-2">
                        {['Короткий клип', 'Анимация', 'Таймлапс', 'Слоумо'].map((style) => (
                          <Badge key={style} variant="outline" className="cursor-pointer hover:bg-emerald hover:text-white hover:border-emerald rounded-xl">
                            {style}
                          </Badge>
                        ))}
                      </div>
                    </TabsContent>
                  </Tabs>
                  
                  <Button 
                    onClick={generateContent}
                    className="w-full bg-gradient-to-r from-indigo to-emerald hover:from-indigo/90 hover:to-emerald/90 text-white py-3 rounded-2xl text-lg font-medium"
                    disabled={!prompt.trim()}
                  >
                    <Icon name="Wand2" size={20} className="mr-2" />
                    Создать {selectedFormat === 'image' ? 'изображение' : 'видео'}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section id="gallery" className="py-20 bg-gradient-to-br from-indigo-50 to-emerald-50">
        <div className="container mx-auto px-4">
          <h3 className="text-3xl font-bold text-center text-darkgray mb-12">Галерея работ</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <Card key={item} className="group overflow-hidden rounded-3xl border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <div className="aspect-square bg-gradient-to-br from-indigo-100 to-emerald-100 relative overflow-hidden">
                  <img 
                    src="https://v3.fal.media/files/elephant/epMu7IdiZmEVhEJZJAg63_output.png" 
                    alt={`Пример ${item}`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
                </div>
                <CardContent className="p-4">
                  <h4 className="font-semibold text-darkgray">Космический пейзаж {item}</h4>
                  <p className="text-gray-600 text-sm">Создано ИИ</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* History Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h3 className="text-3xl font-bold text-center text-darkgray mb-12">История ваших работ</h3>
            
            <div className="space-y-4">
              {history.map((item) => (
                <Card key={item.id} className="rounded-2xl border-gray-100 hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${item.type === 'image' ? 'bg-indigo-100' : 'bg-emerald-100'}`}>
                          <Icon 
                            name={item.type === 'image' ? 'Image' : 'Video'} 
                            size={20} 
                            className={item.type === 'image' ? 'text-indigo' : 'text-emerald'} 
                          />
                        </div>
                        <div>
                          <h4 className="font-semibold text-darkgray">{item.title}</h4>
                          <p className="text-gray-600 text-sm">{item.date}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge variant={item.type === 'image' ? 'default' : 'secondary'} className="rounded-lg">
                          {item.type === 'image' ? 'Изображение' : 'Видео'}
                        </Badge>
                        <Button variant="ghost" size="sm" className="rounded-lg">
                          <Icon name="Download" size={16} />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 bg-gradient-to-br from-darkgray to-indigo text-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold mb-4">Выберите ваш тариф</h3>
            <p className="text-white/80">Начните бесплатно или выберите план для профессионалов</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                name: 'Базовый',
                price: 'Бесплатно',
                features: ['10 изображений в месяц', '2 видео в месяц', 'Стандартное качество'],
                color: 'border-white/20'
              },
              {
                name: 'Профи',
                price: '999₽/мес',
                features: ['100 изображений в месяц', '20 видео в месяц', 'HD качество', 'Приоритетная обработка'],
                color: 'border-emerald ring-2 ring-emerald',
                popular: true
              },
              {
                name: 'Эксперт',
                price: '2999₽/мес',
                features: ['Безлимитные изображения', 'Безлимитные видео', '4K качество', 'API доступ'],
                color: 'border-white/20'
              }
            ].map((plan) => (
              <Card key={plan.name} className={`bg-white/10 backdrop-blur-sm border-2 ${plan.color} rounded-3xl relative overflow-hidden`}>
                {plan.popular && (
                  <div className="absolute top-4 right-4">
                    <Badge className="bg-emerald text-white rounded-lg">Популярный</Badge>
                  </div>
                )}
                <CardHeader className="text-center p-8">
                  <CardTitle className="text-2xl text-white">{plan.name}</CardTitle>
                  <CardDescription className="text-3xl font-bold text-white mt-2">{plan.price}</CardDescription>
                </CardHeader>
                <CardContent className="p-8 pt-0">
                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-center text-white/90">
                        <Icon name="Check" size={16} className="text-emerald mr-3" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Button 
                    className={`w-full rounded-2xl ${plan.popular ? 'bg-emerald hover:bg-emerald/90' : 'bg-white/20 hover:bg-white/30'} text-white border-0`}
                  >
                    {plan.price === 'Бесплатно' ? 'Начать бесплатно' : 'Выбрать план'}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-darkgray text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-indigo rounded-lg flex items-center justify-center">
                  <Icon name="Sparkles" size={18} className="text-white" />
                </div>
                <h4 className="text-xl font-bold">AI Generator</h4>
              </div>
              <p className="text-white/70">Создавайте удивительный контент с помощью искусственного интеллекта</p>
            </div>
            
            <div>
              <h5 className="font-semibold mb-4">Продукт</h5>
              <ul className="space-y-2 text-white/70">
                <li><a href="#" className="hover:text-white transition-colors">Генератор изображений</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Генератор видео</a></li>
                <li><a href="#" className="hover:text-white transition-colors">API</a></li>
              </ul>
            </div>
            
            <div>
              <h5 className="font-semibold mb-4">Поддержка</h5>
              <ul className="space-y-2 text-white/70">
                <li><a href="#" className="hover:text-white transition-colors">Документация</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Помощь</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Связаться с нами</a></li>
              </ul>
            </div>
            
            <div>
              <h5 className="font-semibold mb-4">Связь</h5>
              <p className="text-white/70 mb-4">Подключитесь к сервису hailuoai.video</p>
              <Button className="bg-indigo hover:bg-indigo/90 rounded-xl">
                <Icon name="ExternalLink" size={16} className="mr-2" />
                Перейти к hailuoai.video
              </Button>
            </div>
          </div>
          
          <div className="border-t border-white/20 mt-8 pt-8 text-center">
            <p className="text-white/70">© 2024 AI Generator. Все права защищены.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;