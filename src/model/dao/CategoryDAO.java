package model.dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;

import model.CategoryDTO;
import model.FlowerDTO;
import util.DBConnection;

public class CategoryDAO {
	public static ArrayList<CategoryDTO> getAll() throws SQLException {
		ArrayList<CategoryDTO> ketqua = new ArrayList<>();
		Connection connection = DBConnection.getConnection();
		String sql = "SELECT * FROM category";
		PreparedStatement preStatement = connection.prepareStatement(sql);
		ResultSet re = preStatement.executeQuery();
		while(re.next()){
			String id = re.getString("id");
			String name = re.getString("name");
			CategoryDTO c = new CategoryDTO(id, name);
			ketqua.add(c);
		}
		return ketqua;
	}
	
	
}
