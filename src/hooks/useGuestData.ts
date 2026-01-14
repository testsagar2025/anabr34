import { useState, useEffect } from 'react';

export interface GuestData {
  id: string;
  name: string;
  type: 'family' | 'single' | string;
  events: string[];
  address: string;
  notes: string;
  include_address: boolean;
}

// Event name mappings to Hindi
export const eventNameHindi: Record<string, string> = {
  shadi: 'शादी',
  rasum: 'रस्म',
  tilak: 'तिलक',
  haldi: 'हल्दी',
  mehndi: 'मेहंदी',
};

// Event icons
export const eventIcons: Record<string, string> = {
  shadi: '💒',
  rasum: '🪷',
  tilak: '🔴',
  haldi: '🌻',
  mehndi: '🌿',
};

// Event descriptions in Hindi
export const eventDescriptions: Record<string, string> = {
  shadi: 'पवित्र विवाह समारोह में आपकी उपस्थिति हमारे लिए सौभाग्य की बात होगी',
  rasum: 'शुभ रस्म में आपकी उपस्थिति आवश्यक है',
  tilak: 'तिलक की शुभ रस्म में आपको सादर आमंत्रित किया जाता है',
  haldi: 'हल्दी की रस्म में आपकी उपस्थिति हमें अत्यंत प्रसन्नता प्रदान करेगी',
  mehndi: 'मेहंदी की खुशियों में शामिल होने के लिए आपको आमंत्रित किया जाता है',
};

const API_URL = 'https://app.base44.com/api/apps/69663f1704636ad61e212b37/entities/Guest';
const API_KEY = '61780018ee5947afabb67ae71c27ba88';

export const useGuestData = (guestId: string | null) => {
  const [guestData, setGuestData] = useState<GuestData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!guestId) {
      setGuestData(null);
      return;
    }

    const fetchGuestData = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(`${API_URL}/${guestId}`, {
          headers: {
            'api_key': API_KEY,
            'Content-Type': 'application/json'
          }
        });

        if (!response.ok) {
          throw new Error('मेहमान की जानकारी नहीं मिली');
        }

        const data = await response.json();
        setGuestData(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'कुछ गड़बड़ हो गई');
        setGuestData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchGuestData();
  }, [guestId]);

  return { guestData, loading, error };
};
