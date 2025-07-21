// import React, { useState, useEffect, useContext } from 'react';
// import { Aperture, Sparkles, Bot } from 'lucide-react';
// import AppContext from '../context/AppContext';
// import { VIBES } from '../constants/appConstants';
// import PostIdeaCard from '../components/PostIdeaCard';

// function Workspace() {
//     const { brandVoice, products, showNotification } = useContext(AppContext);
//     const [selectedProduct, setSelectedProduct] = useState(null);
//     const [selectedVibe, setSelectedVibe] = useState(null);
//     const [generatedPosts, setGeneratedPosts] = useState([]);
//     const [isLoading, setIsLoading] = useState(false);

//     useEffect(() => {
//         if (products.length > 0 && !selectedProduct) {
//             setSelectedProduct(products[0]);
//         }
//     }, [products, selectedProduct]);
    
//     const generatePosts = async () => {
//         if (!selectedProduct) {
//             showNotification("Please select a product first.");
//             return;
//         }
//         setIsLoading(true);
//         setGeneratedPosts([]);

//         const prompt = `
//             ROLE: You are BrandSpark, a world-class creative director and social media strategist specializing in compelling, viral marketing content for food and beverage brands. Your expertise lies in crafting highly detailed, artistic, and effective prompts for AI image generators, paired with irresistible captions.

//             CONTEXT:
//             - Brand Voice: ${brandVoice}
//             - Product: ${selectedProduct.title}
//             - Product Description: ${selectedProduct.description}
//             - Desired Vibe/Mood: ${selectedVibe ? selectedVibe.name + ' (' + selectedVibe.description + ')' : 'A general, versatile and creative vibe.'}

//             CRITICAL INSTRUCTION: Deeply analyze and synthesize all details from the CONTEXT section. The generated prompts, captions, and hashtags must perfectly reflect the brand's voice, the product's essence, and the chosen vibe. This is the most important part of the task.

//             OBJECTIVE: Generate 4 distinct social media post ideas. Each idea must be a JSON object with three keys: "prompt", "caption", and "hashtags".

//             EXEMPLAR (Follow this structure and level of detail precisely):
//             - "prompt": A highly detailed, professional-grade prompt for an AI image generator (like Midjourney or DALL-E 3). It must include subject, setting, lighting, composition, style, and technical parameters, and MUST end with '--ar 1:1'. Example: "minimalist product photography, a bottle of '${selectedProduct.title}', on a bright white window sill, soft morning sunlight casting long shadows, sheer white curtain gently billowing, blurred background of lush tropical foliage, serene, calm, refreshing, hyper-detailed, photorealistic, shallow depth of field, --ar 1:1 --s 250"
//             - "caption": A short, catchy, and engaging one-line sentence. It must be a single, complete sentence that perfectly matches the brand voice and the scene.
//             - "hashtags": A string of relevant, popular hashtags, starting with the product name.
//         `;
        
//         const payload = {
//             contents: [{ role: "user", parts: [{ text: prompt }] }],
//             generationConfig: {
//                 responseMimeType: "application/json",
//                 responseSchema: {
//                     type: "ARRAY",
//                     items: {
//                         type: "OBJECT",
//                         properties: {
//                             "prompt": { "type": "STRING" },
//                             "caption": { "type": "STRING" },
//                             "hashtags": { "type": "STRING" }
//                         },
//                         required: ["prompt", "caption", "hashtags"]
//                     }
//                 }
//             }
//         };

//         try {
//             const apiKey = process.env.REACT_APP_GEMINI_API_KEY;
//             const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${apiKey}`;
            
//             const response = await fetch(apiUrl, {
//                 method: 'POST',
//                 headers: { 'Content-Type': 'application/json' },
//                 body: JSON.stringify(payload)
//             });

//             if (!response.ok) {
//                 throw new Error(`API error: ${response.statusText}`);
//             }
            
//             const result = await response.json();

//             if (result.candidates && result.candidates[0].content && result.candidates[0].content.parts[0]) {
//                 const generatedJson = JSON.parse(result.candidates[0].content.parts[0].text);
//                 setGeneratedPosts(generatedJson);
//             } else {
//                 throw new Error("Unexpected API response structure.");
//             }

//         } catch (error) {
//             console.error("Error generating posts:", error);
//             showNotification("AI generation failed. Please try again.");
//             setGeneratedPosts([
//                  {
//                    prompt: `Error fallback: Photorealistic image of a ${selectedProduct.title} on a rustic wooden table next to a crackling fireplace. Cinematic lighting, hyper-detailed, 8k. --ar 1:1`,
//                    caption: `Cozy nights and sweet delights. ✨`,
//                    hashtags: `#${selectedProduct.title.replace(/\s/g, '')} #CozyVibes #WinterTreat #ChocolateLover #NightIn`
//                }
//             ]);
//         } finally {
//             setIsLoading(false);
//         }
//     };

//     return (
//         <div className="space-y-8 animate-fade-in">
//             <header className="bg-white p-6 rounded-2xl shadow-xl border border-slate-200">
//                 <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Creative Workspace</h1>
//                 <p className="text-slate-600 mt-1">Select your product and vibe, then let the AI work its magic!</p>
//             </header>

//             <div className="space-y-6">
//                 <div>
//                     <label className="font-bold text-lg text-slate-800 mb-2 block">1. Select a Product</label>
//                     <select
//                         onChange={(e) => setSelectedProduct(products.find(p => p.title === e.target.value))}
//                         className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 bg-white"
//                         value={selectedProduct?.title || ''}
//                     >
//                         {products.map(p => <option key={p.title} value={p.title}>{p.title}</option>)}
//                     </select>
//                 </div>

//                 <div>
//                     <label className="font-bold text-lg text-slate-800 mb-2 block">2. Choose a Vibe (Optional)</label>
//                     <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
//                         {VIBES.map(vibe => (
//                             <button key={vibe.name} onClick={() => setSelectedVibe(vibe)} className={`p-4 rounded-lg border-2 transition-all flex flex-col items-center justify-center text-center ${selectedVibe?.name === vibe.name ? 'bg-indigo-100 border-indigo-500 text-indigo-700 shadow-md' : 'bg-white border-slate-200 hover:border-indigo-400 hover:bg-indigo-50'}`}>
//                                 {vibe.icon}
//                                 <span className="font-semibold mt-2 text-sm">{vibe.name}</span>
//                             </button>
//                         ))}
//                     </div>
//                 </div>
//             </div>
            
//             <div className="bg-white p-5 rounded-xl shadow-xl border border-slate-200 flex items-center justify-center">
//                 <button
//                     onClick={generatePosts}
//                     disabled={isLoading || !selectedProduct}
//                     className="w-full h-full flex items-center justify-center gap-3 bg-indigo-600 text-white font-bold py-4 px-6 rounded-lg shadow-lg hover:bg-indigo-700 transition-all transform hover:scale-105 disabled:bg-indigo-300 disabled:cursor-not-allowed disabled:scale-100"
//                 >
//                     {isLoading ? (
//                         <>
//                             <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
//                             Generating...
//                         </>
//                     ) : (
//                         <>
//                             <Sparkles className="w-6 h-6" />
//                             Generate Ideas
//                         </>
//                     )}
//                 </button>
//             </div>

//             <div className="bg-white p-6 rounded-2xl shadow-xl border border-slate-200 min-h-[400px]">
//                 <h2 className="text-2xl font-bold text-slate-900 mb-4 tracking-tight">Generated Post Ideas</h2>
//                 {isLoading && (
//                      <div className="flex flex-col items-center justify-center text-center p-10">
//                          <Bot className="w-16 h-16 text-indigo-400 animate-bounce mb-4" />
//                          <p className="text-lg text-slate-600">Our AI is brewing up some fresh ideas for you...</p>
//                      </div>
//                 )}
//                 {!isLoading && generatedPosts.length === 0 && (
//                     <div className="flex flex-col items-center justify-center text-center p-10 text-slate-500">
//                          <Aperture className="w-16 h-16 text-slate-300 mb-4" />
//                         <p className="text-lg">Your creative post ideas will appear here.</p>
//                         <p className="text-sm">Select a product and vibe, then click "Generate Ideas" to start.</p>
//                     </div>
//                 )}
//                 <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//                     {generatedPosts.map((post, index) => (
//                         <PostIdeaCard key={index} post={post} />
//                     ))}
//                 </div>
//             </div>
//         </div>
//     );
// }

// export default Workspace;




import React, { useState, useEffect, useContext } from 'react';
import { Aperture, Sparkles, Bot } from 'lucide-react';
import AppContext from '../context/AppContext';
import { VIBES } from '../constants/appConstants';
import PostIdeaCard from '../components/PostIdeaCard';

function Workspace() {
    const { brandVoice, products, showNotification } = useContext(AppContext);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [selectedVibe, setSelectedVibe] = useState(null);
    const [generatedPosts, setGeneratedPosts] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (products.length > 0 && !selectedProduct) {
            setSelectedProduct(products[0]);
        }
    }, [products, selectedProduct]);
    
    const generatePosts = async () => {
        if (!selectedProduct) {
            showNotification("Please select a product first.");
            return;
        }
        setIsLoading(true);
        setGeneratedPosts([]);

        const prompt = `
            ROLE: You are BrandSpark, a world-class creative director and social media strategist specializing in compelling, viral marketing content for food and beverage brands. Your expertise lies in crafting highly detailed, artistic, and effective prompts for AI image generators, paired with irresistible captions.

            CONTEXT:
            - Brand Voice: ${brandVoice}
            - Product: ${selectedProduct.title}
            - Product Description: ${selectedProduct.description}
            - Desired Vibe/Mood: ${selectedVibe ? selectedVibe.name + ' (' + selectedVibe.description + ')' : 'A general, versatile and creative vibe.'}

            CRITICAL INSTRUCTION: Deeply analyze and synthesize all details from the CONTEXT section. The generated prompts, captions, and hashtags must perfectly reflect the brand's voice, the product's essence, and the chosen vibe. This is the most important part of the task.

            OBJECTIVE: Generate 4 distinct social media post ideas. Each idea must be a JSON object with three keys: "prompt", "caption", and "hashtags".

            EXEMPLAR (Follow this structure and level of detail precisely):
            - "prompt": A highly detailed, professional-grade prompt for an AI image generator (like Midjourney or DALL-E 3). It must include subject, setting, lighting, composition, style, and technical parameters, and MUST end with '--ar 1:1'. Example: "minimalist product photography, a bottle of '${selectedProduct.title}', on a bright white window sill, soft morning sunlight casting long shadows, sheer white curtain gently billowing, blurred background of lush tropical foliage, serene, calm, refreshing, hyper-detailed, photorealistic, shallow depth of field, --ar 1:1 --s 250"
            - "caption": A short, catchy, and engaging one-line sentence. It must be a single, complete sentence that perfectly matches the brand voice and the scene.
            - "hashtags": A string of relevant, popular hashtags, starting with the product name.
        `;
        
        const payload = {
            contents: [{ role: "user", parts: [{ text: prompt }] }],
            generationConfig: {
                responseMimeType: "application/json",
                responseSchema: {
                    type: "ARRAY",
                    items: {
                        type: "OBJECT",
                        properties: {
                            "prompt": { "type": "STRING" },
                            "caption": { "type": "STRING" },
                            "hashtags": { "type": "STRING" }
                        },
                        required: ["prompt", "caption", "hashtags"]
                    }
                }
            }
        };

        try {
            // Fix: Check multiple sources for the API key
            const apiKey = window.REACT_APP_GEMINI_API_KEY || 
                          (typeof process !== 'undefined' && process.env?.REACT_APP_GEMINI_API_KEY) ||
                          'AIzaSyDJ9R57IEsp7guMwK5Hlb5Z98rcezPDWUI'; // Replace this with your actual API key as a temporary fix
            
            if (!apiKey || apiKey === 'YOUR_API_KEY_HERE') {
                throw new Error("API key not configured. Please set up your environment variables.");
            }
            
            const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${apiKey}`;
            
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            if (!response.ok) {
                throw new Error(`API error: ${response.statusText}`);
            }
            
            const result = await response.json();

            if (result.candidates && result.candidates[0].content && result.candidates[0].content.parts[0]) {
                const generatedJson = JSON.parse(result.candidates[0].content.parts[0].text);
                setGeneratedPosts(generatedJson);
            } else {
                throw new Error("Unexpected API response structure.");
            }

        } catch (error) {
            console.error("Error generating posts:", error);
            showNotification(`AI generation failed: ${error.message}`);
            
            // Enhanced fallback with multiple examples
            setGeneratedPosts([
                {
                    prompt: `Photorealistic image of a ${selectedProduct.title} on a rustic wooden table next to a crackling fireplace. Cinematic lighting, hyper-detailed, 8k. --ar 1:1`,
                    caption: `Cozy nights and sweet delights. ✨`,
                    hashtags: `#${selectedProduct.title.replace(/\s/g, '')} #CozyVibes #WinterTreat #FoodLover #NightIn`
                },
                {
                    prompt: `Minimalist product photography of ${selectedProduct.title} on white marble surface, soft natural lighting from window, clean aesthetic, professional food photography. --ar 1:1`,
                    caption: `Simple perfection in every bite.`,
                    hashtags: `#${selectedProduct.title.replace(/\s/g, '')} #Minimalist #CleanEating #FoodPhotography #SimpleLife`
                },
                {
                    prompt: `Vibrant flat lay of ${selectedProduct.title} surrounded by fresh ingredients, colorful backdrop, artistic food styling, overhead shot. --ar 1:1`,
                    caption: `Fresh ingredients, endless possibilities.`,
                    hashtags: `#${selectedProduct.title.replace(/\s/g, '')} #FreshIngredients #FoodStyling #ColorfulFood #HealthyEating`
                },
                {
                    prompt: `Atmospheric lifestyle photo of person enjoying ${selectedProduct.title} in cozy cafe setting, warm lighting, candid moment. --ar 1:1`,
                    caption: `Life's simple pleasures, one bite at a time.`,
                    hashtags: `#${selectedProduct.title.replace(/\s/g, '')} #CafeLife #SimplePleasures #Lifestyle #FoodMoments`
                }
            ]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="space-y-8 animate-fade-in">
            <header className="bg-white p-6 rounded-2xl shadow-xl border border-slate-200">
                <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Creative Workspace</h1>
                <p className="text-slate-600 mt-1">Select your product and vibe, then let the AI work its magic!</p>
            </header>

            <div className="space-y-6">
                <div>
                    <label className="font-bold text-lg text-slate-800 mb-2 block">1. Select a Product</label>
                    <select
                        onChange={(e) => setSelectedProduct(products.find(p => p.title === e.target.value))}
                        className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 bg-white"
                        value={selectedProduct?.title || ''}
                    >
                        {products.map(p => <option key={p.title} value={p.title}>{p.title}</option>)}
                    </select>
                </div>

                <div>
                    <label className="font-bold text-lg text-slate-800 mb-2 block">2. Choose a Vibe (Optional)</label>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
                        {VIBES.map(vibe => (
                            <button key={vibe.name} onClick={() => setSelectedVibe(vibe)} className={`p-4 rounded-lg border-2 transition-all flex flex-col items-center justify-center text-center ${selectedVibe?.name === vibe.name ? 'bg-indigo-100 border-indigo-500 text-indigo-700 shadow-md' : 'bg-white border-slate-200 hover:border-indigo-400 hover:bg-indigo-50'}`}>
                                {vibe.icon}
                                <span className="font-semibold mt-2 text-sm">{vibe.name}</span>
                            </button>
                        ))}
                    </div>
                </div>
            </div>
            
            <div className="bg-white p-5 rounded-xl shadow-xl border border-slate-200 flex items-center justify-center">
                <button
                    onClick={generatePosts}
                    disabled={isLoading || !selectedProduct}
                    className="w-full h-full flex items-center justify-center gap-3 bg-indigo-600 text-white font-bold py-4 px-6 rounded-lg shadow-lg hover:bg-indigo-700 transition-all transform hover:scale-105 disabled:bg-indigo-300 disabled:cursor-not-allowed disabled:scale-100"
                >
                    {isLoading ? (
                        <>
                            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                            Generating...
                        </>
                    ) : (
                        <>
                            <Sparkles className="w-6 h-6" />
                            Generate Ideas
                        </>
                    )}
                </button>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-xl border border-slate-200 min-h-[400px]">
                <h2 className="text-2xl font-bold text-slate-900 mb-4 tracking-tight">Generated Post Ideas</h2>
                {isLoading && (
                     <div className="flex flex-col items-center justify-center text-center p-10">
                         <Bot className="w-16 h-16 text-indigo-400 animate-bounce mb-4" />
                         <p className="text-lg text-slate-600">Our AI is brewing up some fresh ideas for you...</p>
                     </div>
                )}
                {!isLoading && generatedPosts.length === 0 && (
                    <div className="flex flex-col items-center justify-center text-center p-10 text-slate-500">
                         <Aperture className="w-16 h-16 text-slate-300 mb-4" />
                        <p className="text-lg">Your creative post ideas will appear here.</p>
                        <p className="text-sm">Select a product and vibe, then click "Generate Ideas" to start.</p>
                    </div>
                )}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {generatedPosts.map((post, index) => (
                        <PostIdeaCard key={index} post={post} />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Workspace;