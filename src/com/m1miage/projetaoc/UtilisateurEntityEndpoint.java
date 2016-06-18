package com.m1miage.projetaoc;

import com.m1miage.projetaoc.PMF;

import com.google.api.server.spi.config.Api;
import com.google.api.server.spi.config.ApiMethod;
import com.google.api.server.spi.config.ApiNamespace;
import com.google.api.server.spi.response.CollectionResponse;
import com.google.appengine.api.datastore.Cursor;
import com.google.appengine.datanucleus.query.JDOCursorHelper;

import java.util.HashMap;
import java.util.List;

import javax.annotation.Nullable;
import javax.inject.Named;
import javax.persistence.EntityExistsException;
import javax.persistence.EntityNotFoundException;
import javax.jdo.PersistenceManager;
import javax.jdo.Query;

@Api(name = "utilisateurentityendpoint", namespace = @ApiNamespace(ownerDomain = "m1miage.com", ownerName = "m1miage.com", packagePath="projetaoc"))
public class UtilisateurEntityEndpoint {

  /**
   * This method lists all the entities inserted in datastore.
   * It uses HTTP GET method and paging support.
   *
   * @return A CollectionResponse class containing the list of all entities
   * persisted and a cursor to the next page.
   */
  @SuppressWarnings({"unchecked", "unused"})
  @ApiMethod(name = "listUtilisateurEntity")
  public CollectionResponse<UtilisateurEntity> listUtilisateurEntity(
    @Nullable @Named("cursor") String cursorString,
    @Nullable @Named("limit") Integer limit) {

    PersistenceManager mgr = null;
    Cursor cursor = null;
    List<UtilisateurEntity> execute = null;

    try{
      mgr = getPersistenceManager();
      Query query = mgr.newQuery(UtilisateurEntity.class);
      if (cursorString != null && cursorString != "") {
        cursor = Cursor.fromWebSafeString(cursorString);
        HashMap<String, Object> extensionMap = new HashMap<String, Object>();
        extensionMap.put(JDOCursorHelper.CURSOR_EXTENSION, cursor);
        query.setExtensions(extensionMap);
      }

      if (limit != null) {
        query.setRange(0, limit);
      }

      execute = (List<UtilisateurEntity>) query.execute();
      cursor = JDOCursorHelper.getCursor(execute);
      if (cursor != null) cursorString = cursor.toWebSafeString();

      // Tight loop for fetching all entities from datastore and accomodate
      // for lazy fetch.
      for (UtilisateurEntity obj : execute);
    } finally {
      mgr.close();
    }

    return CollectionResponse.<UtilisateurEntity>builder()
      .setItems(execute)
      .setNextPageToken(cursorString)
      .build();
  }

  /**
   * This method gets the entity having primary key id. It uses HTTP GET method.
   *
   * @param id the primary key of the java bean.
   * @return The entity with primary key id.
   */
  @ApiMethod(name = "getUtilisateurEntity")
  public UtilisateurEntity getUtilisateurEntity(@Named("id") String id) {
    PersistenceManager mgr = getPersistenceManager();
    UtilisateurEntity utilisateurentity  = null;
    try {
      utilisateurentity = mgr.getObjectById(UtilisateurEntity.class, id);
    } finally {
      mgr.close();
    }
    return utilisateurentity;
  }

  /**
   * This inserts a new entity into App Engine datastore. If the entity already
   * exists in the datastore, an exception is thrown.
   * It uses HTTP POST method.
   *
   * @param utilisateurentity the entity to be inserted.
   * @return The inserted entity.
   */
  @ApiMethod(name = "insertUtilisateurEntity")
  public UtilisateurEntity insertUtilisateurEntity(UtilisateurEntity utilisateurentity) {
    PersistenceManager mgr = getPersistenceManager();
    try {
      if(containsUtilisateurEntity(utilisateurentity)) {
        throw new EntityExistsException("Object already exists");
      }
      mgr.makePersistent(utilisateurentity);
    } finally {
      mgr.close();
    }
    return utilisateurentity;
  }

  /**
   * This method is used for updating an existing entity. If the entity does not
   * exist in the datastore, an exception is thrown.
   * It uses HTTP PUT method.
   *
   * @param utilisateurentity the entity to be updated.
   * @return The updated entity.
   */
  @ApiMethod(name = "updateUtilisateurEntity")
  public UtilisateurEntity updateUtilisateurEntity(UtilisateurEntity utilisateurentity) {
    PersistenceManager mgr = getPersistenceManager();
    try {
      if(!containsUtilisateurEntity(utilisateurentity)) {
        throw new EntityNotFoundException("Object does not exist");
      }
      mgr.makePersistent(utilisateurentity);
    } finally {
      mgr.close();
    }
    return utilisateurentity;
  }

  /**
   * This method removes the entity with primary key id.
   * It uses HTTP DELETE method.
   *
   * @param id the primary key of the entity to be deleted.
   */
  @ApiMethod(name = "removeUtilisateurEntity")
  public void removeUtilisateurEntity(@Named("id") String id) {
    PersistenceManager mgr = getPersistenceManager();
    try {
      UtilisateurEntity utilisateurentity = mgr.getObjectById(UtilisateurEntity.class, id);
      mgr.deletePersistent(utilisateurentity);
    } finally {
      mgr.close();
    }
  }

  private boolean containsUtilisateurEntity(UtilisateurEntity utilisateurentity) {
    PersistenceManager mgr = getPersistenceManager();
    boolean contains = true;
    try {
      mgr.getObjectById(UtilisateurEntity.class, utilisateurentity.getId());
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
