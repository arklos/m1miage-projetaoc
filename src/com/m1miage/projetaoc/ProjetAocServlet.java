package com.m1miage.projetaoc;

import java.io.BufferedReader;
import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;

import javax.servlet.http.*;

import org.mortbay.log.Log;

import com.google.appengine.api.taskqueue.Queue;
import com.google.appengine.api.taskqueue.QueueFactory;
import com.google.appengine.api.taskqueue.TaskOptions;

@SuppressWarnings("serial")
public class ProjetAocServlet extends HttpServlet {
	public void doGet(HttpServletRequest req, HttpServletResponse resp) throws IOException {
		resp.setContentType("text/plain");
		
		// chargement du fichier de données
		InputStream in = this.getClass().getResourceAsStream("liste-aoc.csv");
		
		// lecture du fichier
		BufferedReader buff = new BufferedReader(new InputStreamReader(in));
		
		String line = null;
		while((line = buff.readLine()) != null) {
			System.out.println("---- LECTURE DE L'AOC :  "+line);
			
			// ajout des tâches dans file d'attente (pour éviter le timeout de 30s)
		    Queue queue = QueueFactory.getDefaultQueue();
		    queue.add(TaskOptions.Builder.withUrl("/importWorker").param("lineToImport", line));
		
		}
		resp.getWriter().println("Début de l'import ...");
		resp.sendRedirect("/");
	
	}
}
