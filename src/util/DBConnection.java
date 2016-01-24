package util;

import java.sql.Connection;
import java.sql.DriverManager;

public class DBConnection {
	public static Connection getConnection() {
		Connection con = null;
		try {
			Class.forName("com.mysql.jdbc.Driver").newInstance();
			con = DriverManager.getConnection(
					"jdbc:mysql://127.0.0.1/jflower?useUnicode=yes&characterEncoding=UTF-8", "root", "");
		} catch (Exception e) {
			System.out.println(e.getMessage());
			e.printStackTrace();
		}
		return con;
		
	}
	public static void main(String[] args) {
		System.out.println(getConnection());
	}

}
