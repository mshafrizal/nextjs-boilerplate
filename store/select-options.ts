import { create } from 'zustand';
import { Property } from '@/lib/common';

type Store = {
    hotelOptions: Property[];
    setHotelOptions: (hotelOptions: Property[]) => void;
};

export const useSelectOptionsStore = create<Store>()((set) => ({
    hotelOptions: [],
    setHotelOptions: (hotelOptions) => set({ hotelOptions }),
}));
