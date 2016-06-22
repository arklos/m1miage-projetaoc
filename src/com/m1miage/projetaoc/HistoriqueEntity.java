package com.m1miage.projetaoc;

import javax.jdo.annotations.IdentityType;
import javax.jdo.annotations.PersistenceCapable;
import javax.jdo.annotations.Persistent;
import javax.jdo.annotations.PrimaryKey;

@PersistenceCapable(identityType=IdentityType.APPLICATION)
public class HistoriqueEntity {
	
@PrimaryKey
@Persistent
String idHisto;
	
@Persistent
String identifiant;
	
@Persistent
String date;
	
@Persistent
int score;

public String getIdHisto() {
	return idHisto;
}

public void setIdHisto(String idHisto) {
	this.idHisto = idHisto;
}

public String getIdentifiant() {
	return identifiant;
}

public void setIdentifiant(String identifiant) {
	this.identifiant = identifiant;
}

public int getScore() {
	return score;
}

public void setScore(int score) {
	this.score = score;
}

public String getDate() {
	return date;
}

public void setDate(String date) {
	this.date = date;
}		

}
