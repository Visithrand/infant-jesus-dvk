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
    public ResponseEntity<?> testDatabaseConnection() {
        Map<String, Object> response = new HashMap<>();
        try (Connection connection = dataSource.getConnection()) {
            boolean isValid = connection.isValid(5);
            response.put("connection", isValid ? "SUCCESS" : "FAILED");
            if (isValid) {
                DatabaseMetaData metaData = connection.getMetaData();
                response.put("database", metaData.getDatabaseProductName());
                response.put("version", metaData.getDatabaseProductVersion());
                response.put("url", metaData.getURL());
                response.put("username", metaData.getUserName());
                response.put("driver", metaData.getDriverName());
                response.put("driverVersion", metaData.getDriverVersion());
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
    public ResponseEntity<?> getDatabaseTables() {
        Map<String, Object> response = new HashMap<>();
        try (Connection connection = dataSource.getConnection()) {
            DatabaseMetaData metaData = connection.getMetaData();
            String catalog = connection.getCatalog();
            String[] types = {"TABLE"};
            var tables = metaData.getTables(catalog, null, "%", types);
            Map<String, Boolean> tableStatus = new HashMap<>();
            String[] checkTables = {"admins", "announcements", "events", "class_schedules", "facilities"};
            for (String table : checkTables) tableStatus.put(table, false);
            while (tables.next()) {
                String tableName = tables.getString("TABLE_NAME");
                if (tableStatus.containsKey(tableName)) {
                    tableStatus.put(tableName, true);
                }
            }
            response.put("connection", "SUCCESS");
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
