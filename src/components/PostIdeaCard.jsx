import React, { useState, useContext } from 'react';
import { Copy, Check } from 'lucide-react';
import AppContext from '../context/AppContext';

function PostIdeaCard({ post }) {
    const { showNotification } = useContext(AppContext);
    const [copiedItem, setCopiedItem] = useState(null);

    const copyToClipboard = (text, type) => {
        navigator.clipboard.writeText(text).then(() => {
            showNotification(`${type} copied to clipboard!`);
            setCopiedItem(type);
            setTimeout(() => setCopiedItem(null), 2000);
        }, (err) => {
            console.error('Failed to copy text: ', err);
            showNotification('Failed to copy text.');
        });
    };

    const CopyButton = ({ text, type }) => (
        <button 
            onClick={() => copyToClipboard(text, type)} 
            className="absolute top-2 right-2 p-1.5 rounded-md bg-slate-200/50 hover:bg-slate-300/70 transition-colors"
        >
            {copiedItem === type ? <Check className="w-4 h-4 text-green-600" /> : <Copy className="w-4 h-4 text-slate-600" />}
        </button>
    );

    return (
        <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 space-y-4 transition-shadow hover:shadow-lg">
            <div className="relative">
                <h4 className="font-semibold text-slate-500 text-sm uppercase tracking-wider">Image Prompt</h4>
                <p className="text-slate-700 mt-1 pr-10">{post.prompt}</p>
                <CopyButton text={post.prompt} type="Prompt" />
            </div>
            <div className="border-t border-slate-200 pt-4 relative">
                <h4 className="font-semibold text-slate-500 text-sm uppercase tracking-wider">Caption</h4>
                <p className="text-slate-800 font-medium text-lg mt-1 pr-10">{post.caption}</p>
                <CopyButton text={post.caption} type="Caption" />
            </div>
             <div className="border-t border-slate-200 pt-4 relative">
                <h4 className="font-semibold text-slate-500 text-sm uppercase tracking-wider">Hashtags</h4>
                <p className="text-indigo-600 text-sm mt-1 font-mono pr-10">{post.hashtags}</p>
                <CopyButton text={post.hashtags} type="Hashtags" />
            </div>
        </div>
    );
}

export default PostIdeaCard;