

// src/context/MasterDataProvider.tsx

'use client';

import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { ConfigType, SocieteType, ReunionType, UserProfileType } from '@/utils/types';
import { createClient, SupabaseClient } from '@supabase/supabase-js';


export type MasterData = {
	societe: SocieteType[];
//	config: ConfigType[];
	reunion: ReunionType[];
	contact: UserProfileType[];
};

type MasterDataContextType = {
	data: MasterData;
	setData: React.Dispatch<React.SetStateAction<MasterData>>;
};

const MasterDataContext = createContext<MasterDataContextType | undefined>(undefined);


const supabase: SupabaseClient = createClient(
	process.env.NEXT_PUBLIC_SUPABASE_URL!,
	process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export const MasterDataProvider = ({ children }: { children: ReactNode }) => {



	const [data, setData] = useState<MasterData>({
		societe: [],
	//	config: [],
		reunion: [],
		contact: [],
	});

	const [isInitialLoaded, setIsInitialLoaded] = useState(false);

	// fetch initial une seule fois
	useEffect(() => {
		if (isInitialLoaded) return;
/*
		const fetchInitialData = async () => {
			try {
				const { data: societeData } = await supabase.from('societe').select('*') as { data: SocieteType[] | null, error: any };
				const { data: configData } = await supabase.from('config').select('*') as { data: ConfigType[] | null, error: any };
				const { data: reunionData } = await supabase.from('vw_reunion').select('*') as { data: ReunionType[] | null, error: any };
				const { data: contactData } = await supabase.from('vw_user_profiles').select('*') as { data: UserProfileType[] | null, error: any };
				setData({
					societe: societeData ?? [],
					config: configData ?? [],
					reunion: reunionData ?? [],
					contact: contactData ?? [],
				});

				setIsInitialLoaded(true);
			} catch (error) {
				console.error('Erreur fetch initial:', error);
			}
		};

		fetchInitialData();
		*/
	}, [isInitialLoaded]);

	// Realtime listeners
	useEffect(() => {
		/*
		const tables: ('societe' | 'config' | 'reunion' | 'contact')[] = ['societe', 'config', 'reunion', 'contact'];
		const channels: any[] = [];

		tables.forEach(table => {
			const channel = supabase
				.channel(`${table}-changes`)
				.on(
					'postgres_changes',
					{ event: '*', schema: 'public', table },
					payload => {
						const newItem = payload.new;
						if (!newItem) return;

						setData(prev => {
							switch (table) {
								case 'societe': {
									const s = newItem as SocieteType;
									return { ...prev, societe: [...prev.societe.filter(x => x.societeId !== s.societeId), s] };
								}
								case 'config': {
									const c = newItem as ConfigType;
									return { ...prev, config: [...prev.config.filter(x => x.configid !== c.configid), c] };
								}
								case 'reunion': {
									const r = newItem as ReunionType;
									return { ...prev, reunion: [...prev.reunion.filter(x => x.reunionId !== r.reunionId), r] };
								}
								case 'contact': {
									const u = newItem as UserProfileType;
									return { ...prev, contact: [...prev.contact.filter(x => x.id !== u.id), u] };
								}
								default:
									return prev;
							}
						});
					}
				)
				.subscribe();

			channels.push(channel);
			
		});

		return () => {
			channels.forEach(channel => {
				channel.unsubscribe().then(() => console.log('Listener unsubscribed:', channel));
			});
		};
		*/
	}, []);

	return <MasterDataContext.Provider value={{ data, setData }}>{children}</MasterDataContext.Provider>;
};

// Hook pour accéder au contexte
export const useMasterData = () => {
	const ctx = useContext(MasterDataContext);
	if (!ctx) throw new Error('useMasterData must be used within MasterDataProvider');
	return ctx;
};