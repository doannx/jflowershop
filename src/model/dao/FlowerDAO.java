package model.dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;

import model.CategoryDTO;
import model.FlowerDTO;
import util.DBConnection;

public class FlowerDAO {
	public static ArrayList<FlowerDTO> getAll() throws SQLException {
		ArrayList<FlowerDTO> ketqua = new ArrayList<>();
		Connection connection = DBConnection.getConnection();
		String sql = "SELECT * FROM flower";
		PreparedStatement preStatement = connection.prepareStatement(sql);
		ResultSet re = preStatement.executeQuery();
		while (re.next()) {
			String id = re.getString("id");
			String name = re.getString("name");
			String description = re.getString("description");
			String image = re.getString("image");
			String price = re.getString("price");
			FlowerDTO f = new FlowerDTO(id, name, description, image, price);
			ketqua.add(f);
		}
		return ketqua;
	}
	
	
}
