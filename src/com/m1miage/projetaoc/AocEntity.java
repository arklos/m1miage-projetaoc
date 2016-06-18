package com.m1miage.projetaoc;

import javax.jdo.annotations.IdentityType;
import javax.jdo.annotations.PersistenceCapable;
import javax.jdo.annotations.Persistent;
import javax.jdo.annotations.PrimaryKey;

@PersistenceCapable(identityType=IdentityType.APPLICATION)
public class AocEntity {
	
	@PrimaryKey
	@Persistent
	String id;
	
	@Persistent
	String aoclabel;
	
	@Persistent
	Integer nbBoit;
	
	@Persistent
	Integer nbMange;
	
	@Persistent
	Integer codeRegion;

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getAoclabel() {
		return aoclabel;
	}

	public void setAoclabel(String aoclabel) {
		this.aoclabel = aoclabel;
	}

	public Integer getNbBoit() {
		return nbBoit;
	}

	public void setNbBoit(Integer nbBoit) {
		this.nbBoit = nbBoit;
	}

	public Integer getNbMange() {
		return nbMange;
	}

	public void setNbMange(Integer nbMange) {
		this.nbMange = nbMange;
	}

	public Integer getCodeRegion() {
		return codeRegion;
	}

	public void setCodeRegion(Integer codeRegion) {
		this.codeRegion = codeRegion;
	}
}
