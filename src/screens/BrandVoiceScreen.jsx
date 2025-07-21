import React, { useContext } from 'react';
import { Bot, ChevronRight } from 'lucide-react';
import AppContext from '../context/AppContext';

function BrandVoiceScreen() {
    const { brandVoice, setBrandVoice, setPage, showNotification } = useContext(AppContext);

    const handleNext = () => {
        if (brandVoice.trim()) {
            localStorage.setItem('brandVoice', brandVoice);
            setPage('products');
        } else {
            showNotification("Please describe your brand's voice!");
        }
    };

    return (
        <div className="max-w-3xl mx-auto animate-fade-in">
            <div className="bg-white p-8 sm:p-10 rounded-2xl shadow-xl border border-slate-200">
                <div className="flex items-center gap-4 mb-6">
                    <div className="bg-indigo-100 p-3 rounded-full">
                        <Bot className="w-8 h-8 text-indigo-600" />
                    </div>
                    <div>
                        <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">Define Your Brand Voice</h2>
                        <p className="text-slate-600">Describe your brand's personality. Is it playful, luxurious, witty, or something else?</p>
                    </div>
                </div>
                <textarea
                    value={brandVoice}
                    onChange={(e) => setBrandVoice(e.target.value)}
                    placeholder="e.g., 'Our brand is fun, energetic, and appeals to young adults who love sweet treats. We use vibrant colors and a friendly, casual tone.'"
                    className="w-full h-40 p-4 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-200 bg-slate-50"
                ></textarea>
                <div className="mt-6 text-right">
                    <button onClick={handleNext} className="flex items-center justify-center gap-2 bg-indigo-600 text-white font-semibold py-3 px-6 rounded-lg shadow-md hover:bg-indigo-700 transition-all transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                        Next: Add Products <ChevronRight className="w-5 h-5" />
                    </button>
                </div>
            </div>
        </div>
    );
}

export default BrandVoiceScreen;