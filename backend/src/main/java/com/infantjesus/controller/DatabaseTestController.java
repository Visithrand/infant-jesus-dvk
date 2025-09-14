package com.infantjesus.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.sql.DataSource;
import java.sql.Connection;
import java.sql.DatabaseMetaData;
import java.sql.SQLException;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/test")
public class DatabaseTestController {

    @Autowired
    private DataSource dataSource;

    @GetMapping("/database")
    public ResponseEntity<Map<String, Object>> testDatabaseConnection() {
        Map<String, Object> response = new HashMap<>();
        
        try (Connection connection = dataSource.getConnection()) {
            // Test basic connection
            boolean isValid = connection.isValid(5); // 5 second timeout
            response.put("connection", isValid ? "SUCCESS" : "FAILED");
            
            if (isValid) {
                // Get database metadata
                DatabaseMetaData metaData = connection.getMetaData();
                response.put("database", metaData.getDatabaseProductName());
                response.put("version", metaData.getDatabaseProductVersion());
                response.put("url", metaData.getURL());
                response.put("username", metaData.getUserName());
                response.put("driver", metaData.getDriverName());
                response.put("driverVersion", metaData.getDriverVersion());
                
                // Test if school-db database exists
                try {
                    connection.createStatement().execute("USE `school-db`");
                    response.put("databaseExists", true);
                    response.put("databaseName", "school-db");
                } catch (SQLException e) {
                    response.put("databaseExists", false);
                    response.put("databaseError", e.getMessage());
                }
                
                response.put("status", "Database is running and accessible!");
            } else {
                response.put("status", "Database connection failed!");
            }
            
        } catch (SQLException e) {
            response.put("connection", "FAILED");
            response.put("status", "Database connection error!");
            response.put("error", e.getMessage());
            response.put("errorCode", e.getErrorCode());
            response.put("sqlState", e.getSQLState());
        }
        
        return ResponseEntity.ok(response);
    }

    @GetMapping("/database/tables")
    public ResponseEntity<Map<String, Object>> testDatabaseTables() {
        Map<String, Object> response = new HashMap<>();
        
        try (Connection connection = dataSource.getConnection()) {
            connection.createStatement().execute("USE `school-db`");
            
            // Check if tables exist
            DatabaseMetaData metaData = connection.getMetaData();
            String[] tableTypes = {"TABLE"};
            var tables = metaData.getTables("school-db", null, "%", tableTypes);
            
            Map<String, Boolean> tableStatus = new HashMap<>();
            tableStatus.put("admins", false);
            tableStatus.put("announcements", false);
            tableStatus.put("events", false);
            tableStatus.put("class_schedules", false);
            tableStatus.put("facilities", false);
            
            while (tables.next()) {
                String tableName = tables.getString("TABLE_NAME");
                if (tableStatus.containsKey(tableName)) {
                    tableStatus.put(tableName, true);
                }
            }
            
            response.put("connection", "SUCCESS");
            response.put("database", "school-db");
            response.put("tables", tableStatus);
            response.put("status", "Database tables checked successfully!");
            
        } catch (SQLException e) {
            response.put("connection", "FAILED");
            response.put("status", "Error checking database tables!");
            response.put("error", e.getMessage());
        }
        
        return ResponseEntity.ok(response);
    }
}
