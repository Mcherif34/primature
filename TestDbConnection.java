import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

public class TestDbConnection {
    public static void main(String[] args) {
        String url = "jdbc:sqlserver://localhost:1433;databaseName=GED;encrypt=false";
        String user = "sa";
        String password = "Mcherif@3441";
        
        System.out.println("Testing connection to SQL Server...");
        System.out.println("URL: " + url);
        System.out.println("User: " + user);
        
        try {
            // Load the SQL Server JDBC driver
            Class.forName("com.microsoft.sqlserver.jdbc.SQLServerDriver");
            System.out.println("SQL Server JDBC driver loaded successfully");
            
            // Attempt to connect
            Connection connection = DriverManager.getConnection(url, user, password);
            System.out.println("✅ SUCCESS: Connected to SQL Server database 'GED'");
            
            // Test a simple query
            var stmt = connection.createStatement();
            var rs = stmt.executeQuery("SELECT @@VERSION as version");
            if (rs.next()) {
                System.out.println("SQL Server version: " + rs.getString("version"));
            }
            
            connection.close();
            System.out.println("Connection closed successfully");
            
        } catch (ClassNotFoundException e) {
            System.err.println("❌ ERROR: SQL Server JDBC driver not found");
            System.err.println("Make sure the mssql-jdbc dependency is in your classpath");
            e.printStackTrace();
        } catch (SQLException e) {
            System.err.println("❌ ERROR: Failed to connect to SQL Server");
            System.err.println("Error: " + e.getMessage());
            System.err.println("Error Code: " + e.getErrorCode());
            System.err.println("SQL State: " + e.getSQLState());
            e.printStackTrace();
        }
    }
}
