package model.dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

import util.DBConnection;

public class SettingDAO {
	public static String getById(int id) throws SQLException {
		Connection connection = DBConnection.getConnection();
		String sql = "select value from setting where id=?";
		PreparedStatement preparedStatement = connection.prepareStatement(sql);
		preparedStatement.setInt(1, id);
		
		ResultSet rs = preparedStatement.executeQuery();
		rs.next();
		return rs.getString("value");
	}
}
