import React from 'react';
import { Wand2, Sparkles, ShoppingBag } from 'lucide-react';

function OnboardingScreen({ onNewUser, onExistingUser, isExistingUser }) {
    return (
        <div className="flex flex-col items-center justify-center min-h-[80vh] text-center">
            <div className="bg-white p-8 sm:p-12 rounded-2xl shadow-xl max-w-2xl w-full border border-slate-200">
                <div className="relative w-20 h-20 mx-auto mb-6">
                    <div className="absolute inset-0 bg-indigo-500 rounded-full blur-xl opacity-50"></div>
                    <Wand2 className="relative w-20 h-20 mx-auto text-indigo-600" />
                </div>
                <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 mb-4 tracking-tight">Welcome to BrandSpark</h1>
                <p className="text-lg text-slate-600 mb-8 max-w-md mx-auto">Your AI partner for creating stunning social media posts. Let's ignite your brand's presence.</p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <button onClick={onNewUser} className="flex items-center justify-center gap-2 bg-indigo-600 text-white font-semibold py-3 px-6 rounded-lg shadow-md hover:bg-indigo-700 transition-all transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                        <Sparkles className="w-5 h-5" />
                        Create New Brand
                    </button>
                    {isExistingUser && (
                        <button onClick={onExistingUser} className="flex items-center justify-center gap-2 bg-white text-slate-700 font-semibold py-3 px-6 rounded-lg border border-slate-300 hover:bg-slate-100 transition-all transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                            <ShoppingBag className="w-5 h-5" />
                            Load My Workspace
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}

export default OnboardingScreen;