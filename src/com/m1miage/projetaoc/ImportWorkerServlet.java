package com.m1miage.projetaoc;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;


@SuppressWarnings("serial")
public class ImportWorkerServlet extends HttpServlet {

	  protected void doPost(HttpServletRequest request, HttpServletResponse response)
	          throws ServletException, IOException {
	    String line = request.getParameter("lineToImport");
	    
	    System.out.println("Tentative d'enregistrement de "+line);

		AocEntityEndpoint service = new AocEntityEndpoint();
	 
	    String[] aocTab = line.split(";");
	 // création de l'aoc
	 	AocEntity e = new AocEntity();
	 	// id de l'aoc
	 	e.setId(aocTab[0]);
	 	// libelle
	 	e.setAoclabel(aocTab[1]);
	 	// code région
	 	e.setCodeRegion(Integer.parseInt(aocTab[2]));
	 	e.setNbBoit(0);
	 	e.setNbMange(0);
	 			
	 	// enregistrement de l'AOC
	 	service.insertAocEntity(e);
	 	response.getWriter().println("Enregistrement de l'AOC " + line + " effectué");
	  }
	}