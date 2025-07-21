import React from 'react';
import { Box, Sun, Moon, Coffee, Users } from 'lucide-react';

export const VIBES = [
    { name: 'Cozy Night', icon: <Moon className="w-6 h-6" />, description: 'Warm, intimate, and relaxing nighttime scenes.' },
    { name: 'Nature Escape', icon: <Sun className="w-6 h-6" />, description: 'Fresh, organic, and serene outdoor settings.' },
    { name: 'Morning Ritual', icon: <Coffee className="w-6 h-6" />, description: 'Bright, energizing, and routine-focused morning vibes.' },
    { name: 'Urban Modern', icon: <Users className="w-6 h-6" />, description: 'Sleek, chic, and stylish city life.' },
    { name: 'Minimalist', icon: <Box className="w-6 h-6" />, description: 'Clean, simple, and product-focused.' },
];