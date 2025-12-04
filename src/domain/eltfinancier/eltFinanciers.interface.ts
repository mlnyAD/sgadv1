export interface DbEltFinancier {
	efId : number;
	efLtId : number;
	efDate : Date;
	efAchat : boolean;
	efLibelle : string;
	efValeurHT : number;
	efValeurTTC : number;
	efRegleLe : Date;
	efReference : string;
	lmod: Date;
};
