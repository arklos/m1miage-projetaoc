package com.m1miage.projetaoc;

import java.util.HashSet;
import java.util.Random;
import java.util.Set;

public class Utils {
	public static Set<Integer> getTirageAleatoireJeu() {
		Set<Integer> tirage = new HashSet<Integer>();
		Random rn = new Random();
		int i=1;
		while(i<=Constantes.NB_QUESTIONS_JEU) {
			int rand = rn.nextInt(Constantes.MAX_AOC_ID - Constantes.MIN_AOC_ID) + Constantes.MIN_AOC_ID;
			if(!tirage.contains(rand)){
				tirage.add(rand);
				i++;
			}
		}
		return tirage;
	}
}
