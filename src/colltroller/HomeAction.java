package colltroller;

import java.util.ArrayList;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.struts.action.Action;
import org.apache.struts.action.ActionForm;
import org.apache.struts.action.ActionForward;
import org.apache.struts.action.ActionMapping;

import model.FlowerDTO;
import model.dao.FlowerDAO;

public class HomeAction extends Action {

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
		String categoryid = request.getParameter("categoryid");
		ArrayList<FlowerDTO> flowers = FlowerDAO.getByCategory(categoryid);
		request.getSession().setAttribute("FLOWER", flowers);

		// TODO Auto-generated method stub
		String homesuccess;
		return mapping.findForward("homesuccess");
	}

}
