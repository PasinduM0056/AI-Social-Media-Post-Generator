import React from 'react';
import { Check } from 'lucide-react';

function Notification({ message, onDismiss }) {
    return (
        <div className="fixed bottom-5 right-5 bg-green-500 text-white py-2 px-4 rounded-lg shadow-lg flex items-center gap-2 animate-fade-in-up">
            <Check className="w-5 h-5" />
            <span>{message}</span>
            <button onClick={onDismiss} className="ml-2 text-lg">&times;</button>
        </div>
    );
}

export default Notification;