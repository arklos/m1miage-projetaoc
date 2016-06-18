package com.m1miage.projetaoc;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Set;

import javax.annotation.Nullable;
import javax.inject.Named;
import javax.jdo.PersistenceManager;
import javax.jdo.Query;
import javax.persistence.EntityExistsException;
import javax.persistence.EntityNotFoundException;

import com.google.api.server.spi.config.Api;
import com.google.api.server.spi.config.ApiMethod;
import com.google.api.server.spi.config.ApiNamespace;
import com.google.api.server.spi.response.CollectionResponse;
import com.google.appengine.api.datastore.Cursor;
import com.google.appengine.datanucleus.query.JDOCursorHelper;

@Api(name = "aocentityendpoint", namespace = @ApiNamespace(ownerDomain = "m1miage.com", ownerName = "m1miage.com", packagePath="projetaoc"))
public class AocEntityEndpoint {

	@SuppressWarnings({"unchecked", "unused"})
	  @ApiMethod(name = "listAocEntity")
	  public CollectionResponse<AocEntity> listAocEntity(
	    @Nullable @Named("cursor") String cursorString,
	    @Nullable @Named("limit") Integer limit) {

	    PersistenceManager mgr = null;
	    Cursor cursor = null;
	    List<AocEntity> execute = null;

	    try{
	      mgr = getPersistenceManager();
	      Query query = mgr.newQuery(AocEntity.class);
	      if (cursorString != null && cursorString != "") {
	        cursor = Cursor.fromWebSafeString(cursorString);
	        HashMap<String, Object> extensionMap = new HashMap<String, Object>();
	        extensionMap.put(JDOCursorHelper.CURSOR_EXTENSION, cursor);
	        query.setExtensions(extensionMap);
	      }

	      if (limit != null) {
	        query.setRange(0, limit);
	      }

	      execute = (List<AocEntity>) query.execute();
	      cursor = JDOCursorHelper.getCursor(execute);
	      if (cursor != null) cursorString = cursor.toWebSafeString();

	      // Tight loop for fetching all entities from datastore and accomodate
	      // for lazy fetch.
	      for (AocEntity obj : execute);
	    } finally {
	      mgr.close();
	    }

	    return CollectionResponse.<AocEntity>builder()
	      .setItems(execute)
	      .setNextPageToken(cursorString)
	      .build();
	  }
	
	@ApiMethod(name = "getRandomListAoc")
	public CollectionResponse<AocEntity> getRandomListAoc() {
		List<AocEntity> items = new ArrayList<AocEntity>();
		Set<Integer> set = Utils.getTirageAleatoireJeu();
		for(Integer i : set) {
			String id = "aoc-"+i;
			AocEntity e = getAocEntity(id);
			items.add(e);
		}
	    return CollectionResponse.<AocEntity>builder()
	  	      .setItems(items)
	  	      .build();
	}
	
	@ApiMethod(name = "getAocEntity")
	  public AocEntity getAocEntity(@Named("id") String id) {
	    PersistenceManager mgr = getPersistenceManager();
	    AocEntity aocEntity  = null;
	    try {
	    	aocEntity = mgr.getObjectById(AocEntity.class, id);
	    } finally {
	      mgr.close();
	    }
	    return aocEntity;
	  }
	
	@ApiMethod(name = "insertAocEntity")
	  public AocEntity insertAocEntity(AocEntity aocEntity) {
	    PersistenceManager mgr = getPersistenceManager();
	    try {
	      if(containsAocEntity(aocEntity)) {
	        throw new EntityExistsException("Object already exists");
	      }
	      mgr.makePersistent(aocEntity);
	    } finally {
	      mgr.close();
	    }
	    return aocEntity;
	  }
	
	@ApiMethod(name = "updateAocEntity")
	  public AocEntity updateAocEntity(AocEntity aocEntity) {
	    PersistenceManager mgr = getPersistenceManager();
	    try {
	      if(!containsAocEntity(aocEntity)) {
	        throw new EntityNotFoundException("Object does not exist");
	      }
	      mgr.makePersistent(aocEntity);
	    } finally {
	      mgr.close();
	    }
	    return aocEntity;
	  }
	
	@ApiMethod(name = "removeAocEntity")
	  public void removeAocEntity(@Named("id") String id) {
	    PersistenceManager mgr = getPersistenceManager();
	    try {
	      AocEntity aocEntity = mgr.getObjectById(AocEntity.class, id);
	      mgr.deletePersistent(aocEntity);
	    } finally {
	      mgr.close();
	    }
	  }
	
	private boolean containsAocEntity(AocEntity aocEntity) {
	    PersistenceManager mgr = getPersistenceManager();
	    boolean contains = true;
	    try {
	      mgr.getObjectById(AocEntity.class, aocEntity.getId());
	    } catch (javax.jdo.JDOObjectNotFoundException ex) {
	      contains = false;
	    } finally {
	      mgr.close();
	    }
	    return contains;
	  }
	
	private static PersistenceManager getPersistenceManager() {
	    return PMF.get().getPersistenceManager();
	  }
}
