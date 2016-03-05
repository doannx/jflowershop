package colltroller;

import java.util.ArrayList;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.struts.action.Action;
import org.apache.struts.action.ActionForm;
import org.apache.struts.action.ActionForward;
import org.apache.struts.action.ActionMapping;

import model.CategoryDTO;
import model.FlowerDTO;
import model.dao.CategoryDAO;
import model.dao.FlowerDAO;
import model.dao.SettingDAO;

public class FlowerAction extends Action {

	/*
	 * (non-Javadoc)
	 * 
	 * @see org.apache.struts.action.Action#execute(org.apache.struts.action.
	 * ActionMapping, org.apache.struts.action.ActionForm,
	 * javax.servlet.http.HttpServletRequest,
	 * javax.servlet.http.HttpServletResponse)
	 */
	@Override
	public ActionForward execute(ActionMapping mapping, ActionForm form, HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		// get id tu Home.jsp
		String flowerid = request.getParameter("flowerid");
		FlowerDTO flower = FlowerDAO.getByID(flowerid);
		request.getSession().setAttribute("FLOWERDETAIL", flower);
		
		String slogan = SettingDAO.getById(1);
		request.getSession().setAttribute("SLOGAN", slogan);
		String headerLogo = SettingDAO.getById(3);
		request.getSession().setAttribute("LOGOHEADER", headerLogo);
		// 2. Load Category
		ArrayList<CategoryDTO> categories = CategoryDAO.getAll();
		request.getSession().setAttribute("CATEGORY", categories);
		String flowerSuccess;
		return mapping.findForward("flowerSuccess");
	}

}
